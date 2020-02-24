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
        $$('#show_surat').html(`
          <div class="card card-outline">            
            <div class="card-content card-content-padding">
              <center><h1>`+x['surat_kop']+`</h1></center>
              <hr>
              <center><h1>`+x['surat_title']+`</h1></center>
              <p>Tanggal surat : `+x['surat_date']+`</p>
              <p>Nomor surat : `+x['surat_nomer']+`</p>
              <p>Penerima surat : `+x['surat_receiver']+`</p>
              <p>`+x['surat_preface']+`</p>
              <p>`+x['surat_content']+`</p>
              <p>Tanggal Acara: `+x['surat_content_date']+`</p>
              <p>Waktu Acara: `+x['surat_content_time']+`</p>
              <p>Tempat Acara: `+x['surat_content_location']+`</p>
              <p>`+x['surat_closing']+`</p>
              <hr>
              <div style="text-align: right;">
                <p>`+x['surat_date']+`, `+x['surat_date_place']+`</p>
                <p>`+x['user_name']+`</p>
              </div> 
            </div>
          </div>
        `);
        $$('#success_show_surat').show();
        $$('#loading_show_surat').hide();
      }
      else {
        $$('#success_show_surat').hide();
        $$('#error_show_surat').append(`<h1>` +obj['message']+ `</h1>`);
        $$('#loading_show_surat').hide();
      }
    },
    error:function(data){
      $$('#success_show_surat').hide();
      $$('#loading_show_surat').hide();
      $$('#error_show_surat').append(`<h1>` +error_connection+ `</h1>`);
    }
  });
}