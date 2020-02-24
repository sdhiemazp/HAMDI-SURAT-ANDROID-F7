function load_home(e, page) {  

  var $ptrContent = $$('.ptr-content');
  $ptrContent.on('ptr:refresh', function (e) {
    // Emulate 2s loading
    setTimeout(function () {
      mainView.router.refreshPage();
      // When loading done, we need to reset it
      app.ptr.done(); // or e.detail();
    }, 2000);
  });

  // logout
  $$('#btn_logout').on('click', function(e) {
    loadingdata();
    app.request({
      method:"POST",
      url:url_api+"logout",
      headers:{
        Authorization:localStorage.token,
        Accept:"application/json"
      },
      success:function(data){
        localStorage.clear();
        page.router.navigate('/login/');
        determinateLoading = false;
        app.dialog.close();
      },
      error:function(data){
        localStorage.clear();
        page.router.navigate('/login/');
        determinateLoading = false;
        app.dialog.close();
      }
    });
  });
  $$('.panel_user_name').html(localStorage.user_name);
        
  $$('.panel_user_photo').attr('src', 'img/user/default.jpg');
}