function load_login(e, page) {
  $$('#btn_login').on('click', function() {
    var username = $$('#username').val();
    var password = $$('#password').val();

    if (username=="" || username==null || password=="" ||password==null) {
      app.dialog.alert(`Silahkan masukkan "Username" dan "Password" !!`);
    } else {
      loadingdata();
      app.request({
        method:"POST",
        url:url_api+"login",
        headers:{
          Accept:"application/json"
        },
        data:{
          username:username, 
          password:password
        },
        success:function(data){
          var obj = JSON.parse(data);
          if(obj['status'] == true) {
            var x = obj['data'];
            localStorage.token = x['token'];
            localStorage.user_id = x['user']['user_id'];
            localStorage.username = x['user']['username'];
            localStorage.user_name = x['user']['user_name'];
            page.router.navigate('/home/');
            determinateLoading = false;
            app.dialog.close();
          }
          else {
            app.dialog.alert(obj['message']);
            determinateLoading = false;
            app.dialog.close();
          }
        },
        error:function(data){
          determinateLoading = false;
          app.dialog.close();
          app.dialog.alert(error_connection);
        }
      });
    }
  });  
}