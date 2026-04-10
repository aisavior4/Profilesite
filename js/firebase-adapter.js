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
// 🚨 구글의 카드 등록을 요구하는 Storage는 이제 아예 쓰지 않습니다! 🚨

console.log("🚀 파이어베이스 마법 어댑터 작동 시작! (Storage 우회 완료)");

// 3. 기존 젠스파크 fetch 가로채기
const originalFetch = window.fetch;
window.fetch = async function() {
    let resource = arguments[0];
    let config = arguments[1];
    
    if (typeof resource === 'string' && resource.startsWith('tables/')) {
        return handleFirebaseRequest(resource, config);
    }
    return originalFetch.apply(this, arguments);
};

// 4. 파이어베이스 처리 로직 (이미지를 텍스트로 압축해서 무료 DB에 다이렉트로 꽂아버림!)
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
