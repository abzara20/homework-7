var _db;

function initFirebase() {
  _db = firebase.firestore();

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log("user");
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var providerData = user.providerData;
      var uid = user.uid;

      $(".account").css("display", "block");
      $(".userless").css("display", "none");
    } else {
      console.log("logged out");
      $(".account").css("display", "none");
      $(".userless").css("display", "block");
    }
  });
}

function logout() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
    });
}

function updateUser(disName) {
  firebase.auth().currentUser.updateProfile({ displayName: disName });
}

function login() {
  console.log("logging in");
  let email = $("#li--email").val();
  let password = $("#li--pw").val();

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      $("#li--email").val("");
      $("#li--pw").val("");
      // Signed in
      var user = userCredential.user;
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
    });
}

function signup() {
  let fName = $("#fName").val();
  let lName = $("#lName").val();
  let email = $("#email").val();
  let password = $("#pw").val();

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      updateUser(fName);

      $("#fname").val("");
      $("#lname").val("");
      $("#email").val("");
      $("#pw").val("");
      // Signed in
      var user = userCredential.user;
      // ...
      console.log("account created");
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
      console.log(errorMessage);
    });
}

function route() {
  let hash = window.location.hash;
  let pgID = hash.replace("#/", "");

  if (pgID == "") {
    MODEL.pgChange("home");
  } else {
    MODEL.pgChange(pgID);

    // this will change the background depending on page
    document.getElementById("wrapper").className = "wrapper--" + pgID;
  }
}

function initListeners() {
  $(window).on("hashchange", route);
  route();

  $(".mobile").click(function (e) {
    gsap.to(".mobile-nav", {
      duration: 0.5,
      opacity: 1,
    });
    $(".mobile-nav").css("z-index", "1000");
  });

  $(".mobile-bg").click(function (e) {
    hideMenu();
  });

  $(".mobile-menu a").click(function (e) {
    hideMenu();
  });

  $("#submit").click(function (e) {
    const user = firebase.auth().currentUser;
    if (user) {
      logout();
      // $("#login").html("Login");
    } else {
      login();
      // $("#login").html("Logout");
    }
  });
}

function hideMenu() {
  gsap.to(".mobile-nav", {
    duration: 0.5,
    opacity: 0,
  });
  $(".mobile-nav").css("z-index", "0");
}

$("document").ready(function () {
  initFirebase();
  initListeners();
  gsap.set($(".mobile-nav"), { opacity: 0 });
});
