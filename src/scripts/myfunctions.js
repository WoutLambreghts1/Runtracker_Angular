function searchfunction(){
  var input, filter, ul, li, a, i;
  input = document.getElementById("my-input-search");
  filter = input.value.toUpperCase();
  ul = document.getElementById("user-list");
  li = ul.getElementsByTagName("li");
  for (i = 0; i < li.length; i++) {
    if (li[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}

function searchfunctionFriends(){
  var input, filter, ul, li, a, i;
  input = document.getElementById("my-input-friends");
  filter = input.value.toUpperCase();
  ul = document.getElementById("friends-list");
  li = ul.getElementsByTagName("li");
  for (i = 0; i < li.length; i++) {
    if (li[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}