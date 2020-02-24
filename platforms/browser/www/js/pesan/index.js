function load_index_surat(e, page) {
  var $ptrContent = $$('.ptr-content');
  $ptrContent.on('ptr:refresh', function (e) {
    // Emulate 2s loading
    setTimeout(function () {
      mainView.router.refreshPage();
      // When loading done, we need to reset it
      app.ptr.done(); // or e.detail();
    }, 2000);
  });
  $$('#success_index_surat').hide();
  app.request({
    method:"GET",
    url:url_api+"surat/index",
    headers:{
      Authorization:localStorage.token,
      Accept:"application/json"
    },
    success:function(data){
      var obj = JSON.parse(data);
      if(obj['status'] == true) {
        var x = obj['data'];
        // guru daily
        for(var i=0;i<x.length;i++)
        {
          $$('#list_index_surat').append(`
              <div class="list inset">
                <ul>
                  <li class="swipeout tmp_pesan_` +x[i]['surat_id']+ `">
                    <div class="swipeout-content">
                      <a href="#" class="item-content color-black">
                      <div class="item-inner">
                        <div class="item-title">` +x[i]['surat_title']+ `</div>
                        <div class="item-after"><span class="badge color-blue"></span></div>
                      </div>
                      </a>
                    </div>
                    <div class="swipeout-actions-right">
                      <a href="/pesan/show/` +x[i]['surat_id']+ `" class="link color-blue">Lihat</a>
                      <a href="/pesan/update/` +x[i]['surat_id']+ `" class="link color-orange">Ubah</a>
                      <a href="" class="link color-red delete_pesan" data-surat_id="` +x[i]['surat_id']+ `">Hapus</a>
                    </div>
                  </li>
                </ul>
              </div>
            `);
        }
        $$('.delete_pesan').on('click', function () {
          var surat_id = $$(this).data('surat_id');
          loadingdata();
          app.request({
            method:"POST",
            url:url_api+"surat/delete",
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
                $$('.tmp_pesan_'+surat_id).hide();
                determinateLoading = false;
                app.dialog.close();
              }
              else
              {
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
        $$('#loading_index_surat').hide();
        $$('#success_index_surat').show();
      }
      else {
        $$('#loading_index_surat').hide();
        $$('#succes_index_surat').hide();
        $$('#error_index_surat').append(`<h1>` +obj['message']+ `</h1>`);
      }
    },
    error:function(data){
      $$('#loading_index_surat').hide();
      $$('#succes_index_surat').hide();
      var toastBottom = app.toast.create({
        text: error_connection,
        closeTimeout: 2000,
      });
      toastBottom.open();
    }
  });
}