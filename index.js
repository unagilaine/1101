function goToPage2() {
    const userName = document.getElementById("userName").value;
    sessionStorage.setItem("userName", userName);
    window.location.href = "page2.html";
    return false;
}