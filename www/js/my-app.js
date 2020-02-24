var $$ = Dom7;
var url_api = 'https://surat.cokotitip.com/api/';
var url_api_photo = 'https://surat.cokotitip.com/images/';
var error_connection = "Terjadi kesalahan jaringan, silahkan coba lagi !!!";
var app = new Framework7({
	root: '#app',
	name: 'Surat',
	id: 'com.cokotitip.surat',
	panel: { swipe: 'left' },
	routes: [
		{
			path: '/index/',
			url: 'index.html',
		},
		// auth login
		{
			path: '/login/',
			url: 'pages/auth/login.html',
			on:
			{
				pageInit:function(e,page)
				{
					load_login(e, page);
				},
				pageAfterIn: function (event, page) 
				{ 
					if(!localStorage.username) {       
						page.router.navigate('/login/',{ animate:false, reloadAll:true });
					} else {
						page.router.navigate('/home/',{ animate:false, reloadAll:true });
					}
				}	
			},
		},
		// home
		{
			path: '/home/',
			url: 'pages/home.html',
			on:
			{
				pageInit: function (e, page) 
				{
					load_home(e, page);
				},
				pageAfterIn: function (event, page) 
				{ 
					if(!localStorage.username) {       
						page.router.navigate('/login/',{ animate:false, reloadAll:true });
					} else {
						page.router.navigate('/home/',{ animate:false, reloadAll:true });
					}
				}
			},
		},
		////////////////////////////////////////////////////////////////////////////////////////
		// surat index
		{
			path: '/pesan/index/',
			url: 'pages/pesan/index.html',
			on:
			{
				pageInit:function(e,page)
				{
					load_index_surat(e, page);
				},
			},
		},
		// surat create
		{
			path: '/pesan/create/',
			url: 'pages/pesan/create.html',
			on:
			{
				pageInit:function(e,page)
				{
					load_create_surat(e, page);
				},
			},
		},
		// surat create
		{
			path: '/pesan/update/:surat_id',
			url: 'pages/pesan/update.html',
			on:
			{
				pageInit:function(e,page)
				{
					load_update_surat(e, page);
				},
			},
		},
	]
});
var mainView = app.views.create('.view-main', { url: '/home/'});
function onBackKeyDown() {
	if(app.views.main.history.length == 1 || app.views.main.router.url == '/home/')
	{
		navigator.app.exitApp();
	} 
	else 
	{
		if(app.views.main.router.url == '/login/' || app.views.main.router.url == '/api_link/') {  
			navigator.app.exitApp();
		}
		else
		{
			app.dialog.close();
			// app.views.main.router.back();
			app.views.main.router.back({
				url: /home/,
				force: true,
				ignoreCache: true
			});
			return false;
		}
	}
}
document.addEventListener("backbutton", onBackKeyDown, false);

function loadingdata() {
	showDeterminate(true);
	determinateLoading = false;
	function showDeterminate(inline) 
	{
		determinateLoading = true;
		var progressBarEl;
		if (inline) {
			progressBarEl = app.dialog.progress();
		} else {
			progressBarEl = app.progressbar.show(0, app.theme === 'md' ? 'yellow' : 'blue');
		}
		function simulateLoading() {
			setTimeout(function () {
				simulateLoading();
			}, Math.random() * 300 + 300);
		}
		simulateLoading();
	}
}