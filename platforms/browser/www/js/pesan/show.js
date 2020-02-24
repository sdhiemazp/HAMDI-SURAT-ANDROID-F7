function load_profil_guru_ubah_profil(e, page) {
  var $ptrContent = $$('.ptr-content');
  $ptrContent.on('ptr:refresh', function (e) {
    // Emulate 2s loading
    setTimeout(function () {
      mainView.router.refreshPage();
      // When loading done, we need to reset it
      app.ptr.done(); // or e.detail();
    }, 2000);
  });
  
  $$('#succes_ubah_profil_guru').hide();
  app.request({
    method:"POST",
    url:url_api+"user_profil",
    headers:{
      Authorization:localStorage.token,
      Accept:"application/json"
    },
    data:{
      role_name:localStorage.role_name, 
      user_id:localStorage.user_id, 
    },
    success:function(data){
      var obj = JSON.parse(data);
      if(obj['status'] == true) {
        var x = obj['data'];
        $$('#ubah_profil_guru_nama').val(x['user']['user_name']);
        $$('#ubah_profil_guru_telepon').val(x['user']['user_phone']);
        $$('#ubah_profil_guru_alamat').val(x['user']['user_address']);
        $$('#ubah_profil_guru_email').val(x['user']['email']);
        if(x['user']['user_sex'] == "Male")
        {
          $$('#ubah_profil_guru_jenis_kelamin').append(`
            <option value="Male">Pria</option>
            <option value="female">Wanita</option>
          `);
        }
        else
        {
          $$('#ubah_profil_guru_jenis_kelamin').append(`
            <option value="female">Wanita</option>
            <option value="Male">Pria</option>
          `);
        }
        $$('#succes_ubah_profil_guru').show();
        $$('#loading_ubah_profil_guru').hide();
      }
      else {
        $$('#succes_ubah_profil_guru').hide();
        $$('#error_ubah_profil_guru').append(`<h1>` +obj['message']+ `</h1>`);
        $$('#loading_ubah_profil_guru').hide();
      }
    },
    error:function(data){
      $$('#succes_ubah_profil_guru').hide();
      $$('#loading_ubah_profil_guru').hide();
      $$('#error_ubah_profil_guru').append(`<h1>` +error_connection+ `</h1>`);
    }
  });
  $$('#btn_simpan_ubah_profil_guru').on('click', function(){
    var user_name = $$('#ubah_profil_guru_nama').val();
    var user_phone = $$('#ubah_profil_guru_telepon').val();
    var email = $$('#ubah_profil_guru_email').val();
    var user_address = $$('#ubah_profil_guru_alamat').val();
    var user_sex = $$('#ubah_profil_guru_jenis_kelamin').val();
    var password = $$('#ubah_profil_guru_password').val();
    loadingdata();
    app.request({
      method:"POST",
      url:url_api+"edit_user_profil",
      headers:{
        Authorization:localStorage.token,
        Accept:"application/json"
      },
      data:{
        user_id:localStorage.user_id,
        role_name:localStorage.role_name,
        username:localStorage.username,
        user_name:user_name,
        user_phone:user_phone,
        email:email,
        user_address:user_address,
        user_sex:user_sex,
        password:password
      },
      success:function(data){
        var obj = JSON.parse(data);
        if(obj['status'] == true) {
          var x = obj['data'];
          determinateLoading = false;
          app.dialog.close();
          app.dialog.alert(x,'Notifikasi',function(){
            app.views.main.router.back({
              url: /home/,
              force: true,
              ignoreCache: true
            });
          });
        }
        else {
          determinateLoading = false;
          app.dialog.close();
          app.dialog.alert(obj['message']);
        }
      },
      error:function(data){
        determinateLoading = false;
        app.dialog.close();
        var toastBottom = app.toast.create({
          text: error_connection,
          closeTimeout: 2000,
        });
        toastBottom.open();
      }
    });
  });
}