function load_show_surat(e, page) {
  var $ptrContent = $$('.ptr-content');
  $ptrContent.on('ptr:refresh', function (e) {
    // Emulate 2s loading
    setTimeout(function () {
      mainView.router.refreshPage();
      // When loading done, we need to reset it
      app.ptr.done(); // or e.detail();
    }, 2000);
  });
  var surat_id = page.router.currentRoute.params.surat_id;
  app.request({
    method:"POST",
    url:url_api+"surat/show",
    headers:{
      Authorization:localStorage.token,
      Accept:"application/json"
    },
    data:{
      surat_id:surat_id, 
    },
    success:function(data){
      var obj = JSON.parse(data);
      if(obj['status'] == true) {
        var x = obj['data'];
        $$('#update_surat_kop').val('adad');
        $$('#update_surat_title').val(x['surat_title']);
        $$('#update_surat_nomer').val(x['surat_nomer']);
        $$('#update_surat_receiver').val(x['surat_receiver']);
        $$('#update_surat_preface').val(x['surat_preface']);
        $$('#update_surat_content').val(x['surat_content']);
        $$('#update_surat_content_date').val(x['surat_content_date']);
        $$('#update_surat_content_time').val(x['surat_content_time']);
        $$('#update_surat_content_location').val(x['surat_content_location']);
        $$('#update_surat_closing').val(x['surat_closing']);
        $$('#update_surat_date_place').val(x['surat_date_place']);
        $$('#success_update_surat').show();
        $$('#loading_update_surat').hide();
      }
      else {
        $$('#success_update_surat').hide();
        $$('#error_update_surat').append(`<h1>` +obj['message']+ `</h1>`);
        $$('#loading_update_surat').hide();
      }
    },
    error:function(data){
      $$('#success_update_surat').hide();
      $$('#loading_update_surat').hide();
      $$('#error_update_surat').append(`<h1>` +error_connection+ `</h1>`);
    }
  });
}