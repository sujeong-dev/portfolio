/* 모달창 열기 */
'use strict';

function onClick() {
    document.querySelector('.modal').classList.remove("hidden");
    document.body.style.overflow = 'hidden'; // 스크롤 막기 on
}
/* 모달창 닫기 */
function offClick() {
    document.querySelector('.modal').classList.add("hidden");
    document.body.style.overflow = 'unset'; // 스크롤 막기 off
}

