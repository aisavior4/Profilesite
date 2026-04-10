// js/firebase-adapter.js

// 1. 파이어베이스 비밀 열쇠 설정
const firebaseConfig = {
  apiKey: "AIzaSyBh8nHEzbwu0E2XHSYW_cDlt8r6KALr9Bc",
  authDomain: "jun-profileweb.firebaseapp.com",
  projectId: "jun-profileweb",
  storageBucket: "jun-profileweb.firebasestorage.app",
  messagingSenderId: "668267438434",
  appId: "1:668267438434:web:7f665ea8f6b269cf270c3b",
  measurementId: "G-5K1FS5H2RQ"
};

// 2. 파이어베이스 초기화
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();
const storage = firebase.storage();

console.log("🚀 파이어베이스 마법 어댑터 작동 시작!");

// 3. 기존 젠스파크 fetch 가로채기 (핵심 기술!)
const originalFetch = window.fetch;
window.fetch = async function() {
    let resource = arguments[0];
    let config = arguments[1];
    
    // 젠스파크 서버로 가는 요청을 납치해서 파이어베이스로 보냅니다.
    if (typeof resource === 'string' && resource.startsWith('tables/')) {
        return handleFirebaseRequest(resource, config);
    }
    return originalFetch.apply(this, arguments);
};

// 4. 파이어베이스 처리 로직
async function handleFirebaseRequest(resource, config) {
    const url = new URL(resource, window.location.origin);
    const pathParts = url.pathname.replace(/^\//, '').split('/');
    const collectionName = pathParts[1];
    const docId = pathParts[2];
    const method = config?.method || 'GET';
    const body = config?.body ? JSON.parse(config.body) : null;

    try {
        if (method === 'GET') {
            if (docId) {
                const docRef = await db.collection(collectionName).doc(docId).get();
                return fakeResponse(docRef.exists ? { id: docRef.id, ...docRef.data() } : null);
            } else {
                const snapshot = await db.collection(collectionName).get();
                let data = [];
                snapshot.forEach(doc => {
                    data.push({ id: doc.id, ...doc.data() });
                });
                
                if (url.searchParams.get('sort') === 'order') {
                    data.sort((a, b) => (a.order || 0) - (b.order || 0));
                }
                
                const limitParam = url.searchParams.get('limit');
                if (limitParam) {
                    data = data.slice(0, parseInt(limitParam, 10));
                }
                return fakeResponse({ data: data, total: data.length });
            }
        } 
        else if (method === 'POST') {
            await processImages(collectionName, body);
            let newDoc;
            if (body.id) {
                await db.collection(collectionName).doc(body.id).set(body);
                newDoc = { id: body.id, ...body };
            } else {
                const docRef = await db.collection(collectionName).add(body);
                newDoc = { id: docRef.id, ...body };
            }
            return fakeResponse(newDoc);
        } 
        else if (method === 'PATCH' || method === 'PUT') {
            await processImages(collectionName, body);
            await db.collection(collectionName).doc(docId).set(body, { merge: true });
            return fakeResponse({ id: docId, ...body });
        } 
        else if (method === 'DELETE') {
            await db.collection(collectionName).doc(docId).delete();
            return fakeResponse({ success: true }, 204);
        }
    } catch (e) {
        console.error("🔥 파이어베이스 처리 에러:", e);
        return new Response(e.message, { status: 500 });
    }
}

function fakeResponse(data, status = 200) {
    return new Response(JSON.stringify(data), {
        status: status,
        headers: { 'Content-Type': 'application/json' }
    });
}

// 이미지 파일을 파이어베이스 Storage에 안전하게 저장하는 함수
async function processImages(collectionName, body) {
    if (!body) return;
    
    const uploadBase64 = async (base64Str) => {
        if (!base64Str.startsWith('data:image')) return base64Str;
        const fileName = `uploads/${collectionName}/${Date.now()}_${Math.random().toString(36).substring(7)}.jpg`;
        const storageRef = storage.ref().child(fileName);
        await storageRef.putString(base64Str, 'data_url');
        return await storageRef.getDownloadURL();
    };
    
    const imageFields = ['image_url', 'hero_bg_image', 'about_image', 'profile_image'];
    for (const field of imageFields) {
        if (body[field] && body[field].startsWith('data:image')) {
            body[field] = await uploadBase64(body[field]);
        }
    }
}