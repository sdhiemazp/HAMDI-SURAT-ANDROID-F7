function load_create_surat(e, page) {
  var $ptrContent = $$('.ptr-content');
  $ptrContent.on('ptr:refresh', function (e) {
    // Emulate 2s loading
    setTimeout(function () {
      mainView.router.refreshPage();
      // When loading done, we need to reset it
      app.ptr.done(); // or e.detail();
    }, 2000);
  });
  
  $$('#btn_create_surat').on('click', function(){
    var create_surat_kop = $$('#create_surat_kop').val();
    var create_surat_title = $$('#create_surat_title').val();
    var create_surat_nomer = $$('#create_surat_nomer').val();
    var create_surat_receiver = $$('#create_surat_receiver').val();
    var create_surat_preface = $$('#create_surat_preface').val();
    var create_surat_content = $$('#create_surat_content').val();
    var create_surat_content_date = $$('#create_surat_content_date').val();
    var create_surat_content_time = $$('#create_surat_content_time').val();
    var create_surat_content_location = $$('#create_surat_content_location').val();
    var create_surat_closing = $$('#create_surat_closing').val();
    var create_surat_date_place = $$('#create_surat_date_place').val();
    loadingdata();
    app.request({
      method:"POST",
      url:url_api+"edit_user_profil",
      headers:{
        Authorization:localStorage.token,
        Accept:"application/json"
      },
      data:{
        create_surat_kop : create_surat_kop,
        create_surat_title : create_surat_title,
        create_surat_nomer : create_surat_nomer,
        create_surat_receiver : create_surat_receiver,
        create_surat_preface : create_surat_preface,
        create_surat_content : create_surat_content,
        create_surat_content_date : create_surat_content_date,
        create_surat_content_time : create_surat_content_time,
        create_surat_content_location : create_surat_content_location,
        create_surat_closing : create_surat_closing,
        create_surat_date_place : create_surat_date_place,
        user_id : localStorage.user_id,
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