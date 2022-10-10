// 문법이나 이상한 짓을 못하도록 선언하기
"use strict";

/* intro 타이핑효과 */
const introText = document.querySelector(".home__introtext");
const content = "안녕하세요.\n저는 구수정입니다 :)";
let index = 0;
let putWord = "";

/* 
textContent는 <script>와 <style> 요소를 포함한 모든 요소의 콘텐츠를 가져옴 -> 따라서 <br/>태그를 넣어줄 수가 없음
innerText는 렌더링이 되어 "사람이 읽을 수 있는" 요소만 처리합니다.
innerHTML은 XSS 공격에 취약하므로 가급적 사용금지xxxxxx 
*/
// 0.3초마다 한글자씩 .home__introtext에 들어가짐
const typingInterval = setInterval(() => {
  putWord += content[index++];
  console.log(putWord);
  introText.innerText = putWord;
  // introText.innerText += content[index++];
  // 위의 코드처럼 진행 시 띄어쓰기가 나올 경우 ex) "저는 "까지 입력된 innerText를 가져올 시 띄어쓰기가 trim됨
}, 320);
// 문구가 끝나면 함수호출 중단 -> 사파리에서 약간 시간지연 있어 +30 적용
setTimeout(() => {
  clearInterval(typingInterval);
}, 320 * content.length + 30);

/* navbar 메뉴 클릭 시 해당 부분으로 이동하고 스크롤 이벤트 */
const navbarMenu = document.querySelector(".navbar__menu");
// const clickedMenu = document.querySelector('.navbar__menu__item');
navbarMenu.addEventListener("click", (event) => {
  // event.target : <li class="navbar__menu__item active">Home</li>
  // event.target.dataset : DOMStringMap {link: '#about'}
  const link = event.target.dataset.link;
  if (link == null) return;
  scrollinto(link);
});
/* navbar 모바일버전 토글버튼 활성화 */
const navToggle = document.querySelector(".navbar__toggle-btn");
navToggle.addEventListener("click", () => {
  navbarMenu.classList.toggle("visible");
  navbarMenu.addEventListener("click", () => {
    navbarMenu.classList.remove("visible");
  });
});
/* 로고 클릭 시 정렬된 navbar menulist 비활성화 */
const logo = document.querySelector(".navbar__logo");
logo.addEventListener("click", () => {
  navbarMenu.classList.remove("visible");
});

/* 인트로 이미지 클릭 시 contact footer로 이동 */
const navbarImg = document.querySelector(".home__avatar");
navbarImg.addEventListener("click", () => {
  scrollinto("#footer");
});

/* 스크롤 내릴 시 intro 섹션 점점 불투명하게 스타일링 */
const intro = document.querySelector(".home__container");
const introHeight = intro.offsetHeight;
document.addEventListener("scroll", () => {
  intro.style.opacity = 1 - window.scrollY / introHeight;
});

/* 스크롤 내릴 시 top버튼 생성 후 클릭 시 맨위로 스크롤링 */
const topBtn = document.querySelector(".top-btn");
document.addEventListener("scroll", () => {
  if (window.scrollY > introHeight / 2) {
    topBtn.classList.add("visible");
  } else {
    topBtn.classList.remove("visible");
  }
});
topBtn.addEventListener("click", () => {
  scrollinto("#home");
});

/* 포트폴리오에 Front, back 나누어 해당 카테고리별로 필터링해서 보여주기 */
const categoryBtn = document.querySelector(".work__categories");
const projects = document.querySelectorAll(".project");
const projectContainer = document.querySelector(".work__projects");
categoryBtn.addEventListener("click", (e) => {
  // 선택된 버튼에 스타일링
  const selected = document.querySelector(".category__btn.selected");
  console.log(selected);
  selected.classList.remove("selected");
  const target =
    e.target.nodeName === "BUTTON" ? e.target : e.target.parentNode;
  target.classList.add("selected");

  /*
  숫자버튼을 나타내는 span 태그를 클릭시 data-filter가 정의되어있지 않아 parentnode인
  category__btn의 filter값을 가져온다.
  */
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
  if (filter == null) return;
  projectContainer.classList.add("anim-out");
  /*
  이미지들이 안보였다가 필터링 후 0.3초 뒤에 필터링된 이미지들이 새롭게 보여야하므로 timeout안에서 필터링을 진행
  timeout밖에서 진행할 시 이미지들이 필터링이 된 모습으로 보여졌다가 사라졌다가 다시 보임
  */
  setTimeout(() => {
    projects.forEach((project) => {
      /*
      카테고리버튼의 filter값이랑 project이미지의 filter값이랑 같아야
      front일때 front프로젝트, back일 때 back프로젝트만 보여짐
      */
      if (filter === "*" || filter === project.dataset.type) {
        project.classList.remove("invisible");
      } else {
        project.classList.add("invisible");
      }
    });
    projectContainer.classList.remove("anim-out");
  }, 300);
});

/* 해당 화면에 있을 때 navbar메뉴 활성화시키기 */
/*
1. 모든 섹션 요소들과 메뉴아이템들을 가지고온다.
2. intersectionObserver를 이용하여 요소들을 관찰한다.
3. 보여지는 섹션의 해당 메뉴를 활성화시킨다.
음...스크롤의 위치가 섹션의 id인 경우의 메뉴의 id를 활성화?
*/

/* 해당 목적지까지 스크롤 이동 */
function scrollinto(selector) {
  const destination = document.querySelector(selector);
  destination.scrollIntoView({ behavior: "smooth" });
}
/* 모달창 열기 */
function openModal() {
  document.querySelector(".modal").classList.remove("hidden");
  document.body.style.overflow = "hidden"; // 스크롤 막기 on
}
/* 모달창 닫기 */
function closeModal() {
  document.querySelector(".modal").classList.add("hidden");
  document.body.style.overflow = "unset"; // 스크롤 막기 off
}
