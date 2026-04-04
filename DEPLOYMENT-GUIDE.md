# 🚀 사이트 배포 완벽 가이드

**임형준 프로필 사이트 배포 방법 (초보자용)**

---

## 📝 배포 전 체크리스트

### ✅ 필수 확인 사항:
- [ ] admin-simple.html에서 모든 콘텐츠 입력 완료
- [ ] 이미지 업로드 완료 (갤러리, 프로필 등)
- [ ] Resume 데이터 입력 완료
- [ ] Publications 입력 완료
- [ ] Expertise 순서 자동 정렬 완료
- [ ] 모바일에서 테스트 완료

---

## 🎯 방법 1: Publish 탭 사용 (가장 쉬움!) ⭐⭐⭐⭐⭐

### 단계:
1. **화면 위쪽 "Publish" 탭 클릭**
2. **"Deploy" 또는 "배포" 버튼 클릭**
3. **완료! 🎉**

### 결과:
```
✅ 자동으로 무료 URL 생성됨
   예: https://your-site.netlify.app
   
✅ SSL 인증서 자동 적용 (https)
✅ 즉시 접속 가능
✅ 수정할 때마다 재배포 가능
```

---

## 🎯 방법 2: Netlify 수동 배포

### Step 1: Netlify 가입
```
1. https://www.netlify.com 접속
2. "Sign up" 클릭
3. GitHub 또는 이메일로 가입
```

### Step 2: 사이트 배포
```
1. "Add new site" 클릭
2. "Deploy manually" 선택
3. 프로젝트 폴더를 드래그 앤 드롭!
4. 완료! 🎉
```

### Step 3: 무료 URL 받기
```
자동 생성됨:
https://random-name-abc123.netlify.app

원하는 이름으로 변경:
Site settings → Domain management → Options → Edit site name
→ https://hyungjunlim.netlify.app
```

---

## 💰 도메인 구매 (선택사항)

### 추천 도메인:
- `hyungjunlim.com` (연간 $12)
- `limhyungjun.com` (연간 $12)
- `audiomaster.co.kr` (연간 ₩15,000)

### 구매처:
**한국:**
- 가비아: https://www.gabia.com
- 호스팅케이알: https://www.hosting.kr
- 후이즈: https://whois.co.kr

**해외 (더 저렴!):**
- Namecheap: https://www.namecheap.com ($9/년)
- Google Domains: https://domains.google ($12/년)

### 도메인 연결:
```
1. Netlify → Domain settings → Add custom domain
2. 도메인 입력 (예: hyungjunlim.com)
3. DNS 설정 (도메인 구매처에서):
   - Type: A
   - Host: @
   - Value: 75.2.60.5
   
   - Type: CNAME
   - Host: www
   - Value: your-site.netlify.app
4. 1~24시간 후 자동 연결!
```

---

## 🔍 Google 검색 등록

### Step 1: Google Search Console
```
1. https://search.google.com/search-console 접속
2. "속성 추가" → URL 입력
3. 소유권 확인 (HTML 파일 업로드)
```

### Step 2: Sitemap 제출
```
1. Google Search Console → Sitemaps 메뉴
2. sitemap.xml 입력
3. "제출" 클릭
```

**sitemap.xml 위치:**
- https://your-site.netlify.app/sitemap.xml

---

## 📊 배포 후 체크리스트

### ✅ 확인할 것:
- [ ] 메인 페이지 (index.html) 정상 작동
- [ ] About Me 섹션 데이터 표시
- [ ] Expertise 카드 6개 정상 표시
- [ ] Gallery 이미지 정상 로드
- [ ] Resume 페이지 데이터 표시
- [ ] Publications 페이지 정상 작동
- [ ] Board 게시판 정상 작동
- [ ] 모바일에서 정상 작동
- [ ] Contact 정보 정확함

---

## 🎉 완료!

**축하합니다!** 이제 사이트가 전 세계에 공개되었습니다! 🌍

### 공유하기:
```
✉️ 친구들에게 URL 공유
📱 SNS에 링크 게시
💼 명함에 URL 인쇄
📧 이메일 서명에 추가
```

### 사이트 주소:
```
무료 URL: https://your-site.netlify.app
커스텀 도메인: https://hyungjunlim.com (구매 시)
```

---

## 🔧 문제 해결

### Q: 사이트가 안 열려요
```
A: 1. URL을 정확히 입력했는지 확인
   2. https:// 포함해서 입력
   3. 배포 완료될 때까지 1-2분 대기
```

### Q: 도메인 연결이 안 돼요
```
A: 1. DNS 설정 확인
   2. 24시간까지 기다려보기
   3. Netlify DNS 설정 다시 확인
```

### Q: Google에서 검색이 안 돼요
```
A: 1. 사이트 등록 후 며칠~몇 주 소요됨
   2. sitemap.xml 제출 확인
   3. 콘텐츠 품질 향상 (더 많은 내용 추가)
```

---

## 📞 도움이 필요하면

**문제가 생기면 언제든지 제니에게 물어보세요!** 😊

화이팅입니다! 🎵🎹🎧
