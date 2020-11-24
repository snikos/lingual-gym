"use strict";
;( function ($) {

if (!Array.prototype.shuffle) {
	Array.prototype.shuffle = function() {
		/* var. 1: well good */
		for (var i = this.length - 1; i > 0; i--) {
			var num = Math.floor(Math.random() * (i + 1));
			var d = this[num];
			this[num] = this[i];
			this[i] = d;
		}
		return this;
		
		/* var. 2: well work */
		/*var m = this.length, t, i;
		while (m) {
			i = Math.floor(Math.random() * m--);
			t = this[m];
			this[m] = this[i];
			this[i] = t;
		}
		return this;*/
	}
};

	var widget = {
		supObj: {},
		subArray: [],
		timeLoad: 0,
		countHuge: 0,
		countName: 'arrHuge0',
		loadScriptCounter: -1,
		clickCounter: 0,
		constCount: 10,
		localObject: {},
		derObject: {},
		ranObj: 0,
		loadScript: function( callback ){
			var n = this.countHuge;//0
			var url = 'js/app/dic/arr'+n+'.json';
			var start = Date.now();

			$.ajax({
				type: 'GET',
				url: url,
				dataType: 'json',
				success(data){
					var key = "arrHuge"+n;
					widget.localObject[key] = data;
					widget.countHuge = n;
					widget.countName = key;
					widget.constCount = widget.counter('forex');
					widget.countHuge += 1;
					widget.subArray = [];

					widget.timeLoad = Date.now() - start;
					//console.log('Success: Script was loaded! Timeline: '+ widget.timeLoad);
				},
				error(xhr, status, error){
					if (xhr.status != 404) {console.log(error);}
					else {console.log("404 json not found");}
				}
			}).done(function(data){
				data.forEach( (el, idx, arr) => {
					var mate = el['forex'];
					var n = ( mate['includes']('|') ) ?
					mate['split']('|') :
					(mate['length'] < 4) ?
					'1' : mate['split']('|');
					
					widget.subArray.push( n['length'] );
				});

				widget.timeLoad = Date.now() - start;
				//console.log('Done: Script was loaded and done! Timeline: '+ widget.timeLoad);
				return callback();
			});
		},
		loadDer: function( num, callback ){
			var url = 'deusexrev/der'+num+'.js';

			$.ajax({
				type: 'get',
				url: url,
				dataType: 'script',
				success: function(data){
					var key = 'der'+num;
					widget.derObject[key] = data;
				},
				error: function(xhr, status, error){
					if (xhr.status != 404) {console.log(error);}
					else {console.log("404 json not found");}
				}
			}).done( function(data){
				return callback(data);
			});
		},
		setData: function(a,b,c){
			return $.data(a,b,c)//$.data(widget.supObj, 'yoda', 'values'),//el,key,[val]
		},
		getData: function(a,b){
			return $.data(a,b)//$.data(widget.supObj, 'yoda'),//el,key,[val]
		},
		/* RESET All localStorage*/
		resetLocalStorage: function(){
			var ls = window.localStorage;
			var l = window.location;
			ls.clear();
			l.reload();
		},
		preLoadDer: function( num, foo ){
			if( widget.derObject['der'+num] === undefined ){
				widget.loadDer( num, foo );
			} else {
				foo();
			}
		},
		/* Start deus ex revi phrases / set playerfollowercount to 0  */
		getupLString: function(hard){
			$(document).find('#deusex-box').empty();
			this.ranObj = +($("#datas").data("cur-sli"));
			var lenny = 30;
			
			switch(hard){
			  case'rand': this.ranObj = Math.round( Math.random() * (lenny-1) );
			  break;
				case'prev': this.ranObj -= 1;
				break;
				case'next': this.ranObj += 1;
				break;
			}
			//console.log(this.ranObj +', '+ hard)

			this.preLoadDer( Math.abs(widget.ranObj), ( data ) => {
			
			var ranItem = Object.keys(widget.derObject)[widget.ranObj];

			var listArray = [];
			listArray = ( data !== undefined ) ?
			  data.split('|') :
			    (widget.derObject[ranItem]).split('|');

			var datasText = 'File: '+('der'+Math.abs(widget.ranObj))+'.js; '+'Length: '+(listArray.length-1);
			$('#datas').text(datasText);

			//if( listArray[0].length > 0 ){
			if( listArray[0].length > 0 ){
				$('#deusex').removeClass('clear');
				$.each(listArray, function(idx, el){
					if( idx < listArray.length ){
						var savagen = (Math.round(Math.random()*99)).toString(2);
						var boom = el.split('--');
						var tpl = '<li><a class="widget-list-link"><span class="box-img" data-string="'+el+'"><img src="css/der-evision2.jpg" '+'onerror="this.src=\'css/err.png\'"></span><p><dfn>'+(boom[0])+'</dfn><ins>'+(boom[1])+'</ins></p></a></li>';
						$(document).find('#deusex-box').append(tpl);
					}
				});
			} else {
				var tpl = '<li class="overcover"><!--img src="css/col-logo-large.jpg"--><p>Some text cover notation! The file '+(ranItem)+'.js is empty!</p></li>';
				$(document).find('#deusex-box').append(tpl);
				$('#deusex').addClass('clear');
			}

			var curObjLen = this.ranObj;
			( this.ranObj >= lenny-1 ) ? (curObjLen=0) : ( this.ranObj <= 0 ) ? (curObjLen=lenny-1) : '';
			//ranObj = curObjLen;
			$("#datas").data("cur-sli", (+curObjLen));
			//console.log( 'Dron: '+ this.ranObj +' : '+ lenny +' : '+ curObjLen +' : '+ $("#datas").data("cur-sli") );

			});// foo callback
		},
		getupLS: function(prefix){
			var ls = window.localStorage;
			if( ls.length === 0 ) return;

			if( ls['db'+'-'+'memo'] !== undefined ){
				var currentPfx = (ls['db'+'-'+'memo']).split('|');
				//console.log('Ls:'+ ls['db'+'-'+'memo']);
				$.each(currentPfx, function(idx, el){
					if( idx < currentPfx.length-1 ){
						var savagen = (Math.round(Math.random()*99)).toString(2);
						var memo = el.split('~~');
						var tpl = '<li><a class="widget-list-link"><span class="box-img" data-string="'+el+'"><img src="https://www.gravatar.com/avatar/'+savagen+'?f=y&amp;s=32&amp;d=identicon"'+'onerror="this.src=\'css/err.png\'"></span><p><dfn>'+memo[0]+'</dfn><ins>'+memo[1]+'</ins><span class="count">text</span></p></a></li>';
						$(document).find('#managers').append(tpl);
					}
				});
			} else {
				var savagen = (Math.round(Math.random()*99)).toString(2);
				var tpl = '<li><a class="widget-list-link"><span class="box-img" data-string=""><img src="https://www.gravatar.com/avatar/'+savagen+'?f=y&amp;s=32&amp;d=identicon"'+'onerror="this.src=\'css/err.png\'"></span><p>Clean<span class="count">text</span></p></a></li>';
				$(document).find('#managers').append(tpl);
			}
		},
		/* save localStorage */
		saveLS: function(prefix,curUltimatum,curItemIndex){
			var ls = window.localStorage;
			/*var oldArr = [], newArr = [];

			if(curUltimatum == '') return;
				oldArr.push(ls[prefix+'-'+curUltimatum]);
				( oldArr[0] == undefined ) ? oldArr = [] : oldArr = oldArr;
				oldArr.push(curItemIndex);
				newArr = newArr.concat( oldArr, newArr );
				ls[prefix+'-'+curUltimatum] = newArr;*/
			var oldstr='', newstr='';
			if(curUltimatum == '') return;
			    oldstr += ls[prefix+'-'+curUltimatum];
				(oldstr === 'undefined') ? oldstr = '' : oldstr = oldstr;
				console.log(oldstr.search(curItemIndex));
				if( oldstr.search(curItemIndex) === -1 ){ 
					console.log(oldstr.search(curItemIndex));
					oldstr += curItemIndex+'|';
					newstr += oldstr;
					ls[prefix+'-'+curUltimatum] = newstr;
					console.log(oldstr + ':'+ newstr);
			    }
		},
		widgetDom: $(document).find('.widget .widget-list'),
		counter: function(key){
			var o = Object.keys(this.localObject), total=0;
			$.each(o, function(idx, el){
				var om = widget.localObject[el];
				$.each(om, function(num, val){
					total += (val[key].split('|')).length;
				});
			});
			return total;
		},
		clearAll: function(){
			this.widgetDom.empty();
		},
		preLoadJson: function( foo ){
			/* load next json */
			var a = widget.loadScriptCounter;
			var b = widget.constCount;
			//console.log(a +'|-|'+ b);
			if( a === 0 || a >= b ){
				widget.loadScript( foo );
				return;
			} else {
				widget.timeLoad = 0;
				foo();
			}
		},
		testStarter: function(l, metod){

			widget.loadScriptCounter += 1;
			widget.preLoadJson( function(){

			var keyItem = widget.countName;//'arrHuge0'

				var reg = new RegExp('(#)|(~)|(@)|(\\|\\s)|(\\.)|(\,)|(\“)|(\”)', 'g');

				keyItem = widget.countName;//'arrHuge0'
			  //console.log('clickCounter: '+ widget.clickCounter +', countName: '+ widget.countName +', widget.subArray: '+ widget.subArray);

				var subArr = widget.subArray;//[3,3,2]
				var subClick = Math.round( Math.random() * (subArr.length-1) );
				//var ranPhrase = widget.localObject[keyItem][subClick]; // {'en':','ru':''}

				/*** Random choose */
				var mts = function(len){ return Math['round']( Math['random']() * (len-0.5) ) }
				var sms = function(obj, c1, c2){
					var sos = obj[c1];
					var txt = ( sos['forex']['includes']('|') ) ?
					  (sos['forex']['split']('|'))[c2] :
					  (sos['forex']['length'] < 4) ? (sos['en'] +'--'+ sos['ru']) :
					  sos['forex'];
					return txt;
				}
				var orr = widget.subArray;

				var cho1 = mts(orr['length']);
				var cho2 = mts(orr[cho1]);
				var res0 = sms(widget.localObject[keyItem], cho1, cho2);
				//console.log('Result: '+ res0 + ', orr: ['+ orr +']');//"text--text"
				/*** END Random */

				//console.log( ranPhrase ); //{"en":"...","ru":"..."}

				var tplSketch = function(a){
					var str = '';
					var a = a.replace(reg,'').trim().toLowerCase();
					str = a;
					return str;
				};
				var tplSpan = function(a){
					var str = '';
					var a = a.replace(reg,'').trim().toLowerCase();
					widget.setData(widget.supObj, 'realPhrase', '');
					widget.setData(widget.supObj, 'currentPhrase', []);//remember data Current phrase
					widget.setData(widget.supObj, 'realPhrase', a);//remember data Real phrase
					var oldStr = (a.split(' ')).shuffle();
					$.each(oldStr, function(idx, el){
					  str += '<span data-hook="h'+idx+'" class="frog">'+(el)+'</span>';
					});
					a = a.replace('');
					return str;
				};

				//var forex = (tplSketch(ranPhrase['forex']));
				var forex = tplSketch( res0 );
				var forlen = forex.split('|').length-1;
				var ranforex = Math.round( Math.random() * forlen );
				var ranchoose = Math.round( Math.random() * 1 );
				forex = forex.split('|')[ranforex].split('--');
				//var lang1 = (ranchoose===0 && l === 'en') ? forex[0] : tplSketch(ranPhrase['en']);
				//var lang2 = (ranchoose===0 && l === 'en') ? forex[1] : tplSketch(ranPhrase['ru']);
				var lang1 = forex[0];
				var lang2 = forex[1];
				widget.setData(widget.supObj, 'dataMemo', (lang2+'~~'+lang1));

				//console.log('lang: '+ lang1 +', '+ lang2 +', '+ ranchoose +', '+ l);
				function designers(){
					widget.setData(widget.supObj, 'realPhraseTwo', ((l==='en')?lang2:lang1));
					var tpl = '<li class="enter">'+((l==='en')?lang1:lang2)+'</li>';
					tpl += '<li><textarea name="text" id="inputText" placeholder="enter texts" maxlength="250"></textarea></li>';
					tpl += '<li class="hint"></li>';
					widget.widgetDom.eq(-2).html( tpl );
				};
				designers();
				function developers(){
					var aw = widget.counter('forex');
					var tpl = '<li class="alert"><span class="status">Try!</span><span class="counter">All words:'+(aw)+'</span><span id="resetPhrase">reset</span></li>';
					tpl += '<li class="ex">'+((l==='en')?lang1:lang2)+'</li>';
					tpl += '<li class="test-area"></li>';
					tpl += '<li class="puzzle">'+((l==='en')?tplSpan(lang2):tplSpan(lang1))+'</li>';
					tpl += '<li class="hint"></li>';

					//this.clearAll();
					widget.widgetDom.eq(-1).html( tpl );
				};
				developers();
				function managers(){};

				switch(metod){
					case'designers' : designers();
					case'developers': developers();
					case'managers'  : managers();
				};

				//this.loadScriptCounter += 1;
				widget.clickCounter += 1;
				if( widget.clickCounter >= widget.subArray.length ){
					widget.clickCounter = 0;
				}
		  });
		},
		compareArray: function (a, b) {
			//It works sometimes wrong
			return !a.some(function (e, i) {
				return e != b[i];
			});
		},
		log: function(a){
			//console.log( typeof a, a, arguments.callee);
		},
		createMemo: function(){
			var savagen = (Math.round(Math.random()*99)).toString(2);
			var memo = widget.getData(widget.supObj, 'dataMemo');
			var memon = memo.split('~~');
			//console.log('savagen: '+ memo);
			var tpl = '<li><a class="widget-list-link">'+
			'<span class="box-img" data-string="'+memo+'">'+
			'<img src="https://www.gravatar.com/avatar/'+savagen+'?f=y&amp;s=64&amp;d=identicon"'+
			'onerror="this.src=\'css/err.png\'"></span>'+
			'<p><dfn>'+memon[0]+'</dfn><ins>'+memon[1]+'</ins><span class="count">text</span></p></a></li>';
			$(document).find('#managers').append(tpl);
		},
		events: {
			cloneDropTexts: function(){
				$(document).on('click', '.puzzle .frog', function(event){
					var container = $(document).find('.test-area');
					var clone = $(this).clone().appendTo( container );
					var dataRealPhrase = widget.getData(widget.supObj, 'realPhrase').toLowerCase().split(' ');
					var dataCurrenPhrase = widget.getData(widget.supObj, 'currentPhrase');
					var currenText = ($(this).text()).toLowerCase();
					var btnNextStep = $('#nextPhrase');
					widget.setData(widget.supObj, 'currentPhrase').push(currenText);
					$(this).addClass('hide');
					//console.log( 'currenText: '+ currenText +'\ndataCurrPhrase: '+ dataCurrenPhrase +'\ndataRealPhrase: '+ dataRealPhrase );
					//if ( widget.compareArray(dataRealPhrase, dataCurrenPhrase) ){
					if ( JSON.stringify(dataRealPhrase) === JSON.stringify(dataCurrenPhrase) ){
						widget.widgetDom.find('.alert').addClass('success').children('.status').html('Success!');
						btnNextStep.addClass('active');
						//$(document).off('click.drop', '.test-area .frog');
					}
					event.stopPropagation();
					event.preventDefault();
				});
			},
			dropTexts: function(){
				$(document).on('click.drop', '.test-area .frog', function(event){
					var $that = $(this);
					var hook = $that.data('hook');
					var btnNextStep = $('#nextPhrase');
					widget.setData(widget.supObj, 'currentPhrase').pop();
					$(document).find('.puzzle .frog').filter( function(){
						$(this).data('hook') === hook ? $(this).removeClass('hide') : '';
					});
					$(this).remove();
					widget.widgetDom.find('.alert').removeClass('success').children('.status').html('Carry on!');
					btnNextStep.removeClass('active');
					event.stopPropagation();
					event.preventDefault();
				});
			},
			dropAllText: function(){
				$(document).on('click', '#resetPhrase', function(event){
					var duck = ['Don\'t bother me!', 'Move it!', 'Oh mate.. The moment of truth..','Bad *hit going down..', 'Don\'t take unnecessary risks!', 'I just hope you\'re all right.','Well, never mind..', 'We\'ll handle this!'];
					var txt = duck[ Math.round(Math.random()*(duck.length-1)) ];

					$(document).find('.test-area').empty();
					$(document).find('.puzzle .frog').removeClass('hide');
					widget.setData(widget.supObj, 'currentPhrase', []);
					widget.widgetDom.find('.alert').removeClass('success').children('.status').html(txt);
					return false;
				});
			},
			inputTexts: function(){
				$(document).on('input', '#inputText', function(event){
					var rel = widget.setData(widget.supObj, 'realPhraseTwo');
					var val = $(this).val();
					var btnNextStep = $('#nextPhrase');
					rel = rel.toString().trim().toLowerCase();
					val = val.toString().trim().toLowerCase();
					console.log( 'real: '+ (typeof rel) +':'+ rel +'\nmain: '+ (typeof val) +':'+ val );
					if ( JSON.stringify(rel) === JSON.stringify(val) ){
						$(this).addClass('success');
						btnNextStep.addClass('active');
					} else {
						$(this).removeClass('success');
						btnNextStep.removeClass('active');
					}
					event.stopPropagation();
					event.preventDefault();
				});
			},
			showHint: function(){
				$(document).on('click', '#hint', function(event){
					var dataRealPhrase = widget.getData(widget.supObj, 'realPhrase');
					$(document).find('.hint').html(dataRealPhrase).fadeToggle();
					event.stopPropagation();
					event.preventDefault();
				});
			},
			chooseLang: function(){
				$(document).on('click', '#ruen', function(event){
					(widget.getData(widget.supObj, 'lang') !== 'ru') ? widget.setData(widget.supObj, 'lang', 'ru') : widget.setData(widget.supObj, 'lang', 'en');
					var l = widget.getData(widget.supObj, 'lang');
					widget.testStarter(l);
					event.stopPropagation();
					event.preventDefault();
				});
			},
			nextPhrase: function(){
				$(document).on('click', '#nextPhrase', function(event){
					var l = widget.getData(widget.supObj, 'lang');
					//console.log('langData: '+ l);
					widget.testStarter(l);
					event.stopPropagation();
					event.preventDefault();
				});
			},
			addMemo: function(){
				$(document).on('click', '#addMemo', function(event){
					var memo = widget.getData(widget.supObj, 'dataMemo');
					console.log('memo: '+ memo);
					widget.saveLS('db', 'memo', memo);
					widget.createMemo();
					event.stopPropagation();
					event.preventDefault();
				});
			},
			resetMemo: function(){
				/*Clear local storage*/
				$("#resetLS").on("click", function(e){
					widget.resetLocalStorage();
				});
			},
			removeMemo: function(){
				$(document).on('click', '.box-img', function(event){
					var ls = window.localStorage;
					//var curidx = ($(this).index('.box-img'))+1;
					var curstr = $(this).attr('data-string');
					var memo = ls['db'+'-'+'memo'];
					var reg = '[]|[|]'+curstr+'[|]';
					var repa = new RegExp(reg, 'gm');
					memo = memo.replace(repa, '|');
					ls['db'+'-'+'memo'] = memo;
					//widget.saveLS('db', 'memo', memo);
					event.stopPropagation();
					event.preventDefault();
				});
			},
			showTabs: function(){
				$(document).on('click', '.widget-tab-link', function(event){
					var id = $(this).attr('data-id');
					var btnNextStep = $('#nextPhrase');
					$('.widget-tab').each(function(idx, el){
						( $(el).children().attr('data-id') === id ) ? $(el).addClass('current') : $(el).removeClass('current');
					});
					$('.widget-list').each(function(idx, el){
						( $(el).attr('id') === id ) ? $(el).addClass('open') : $(el).removeClass('open');
					});
					btnNextStep.removeClass('active');
					event.stopPropagation();
					event.preventDefault();
				});
			},
			mixedSlide: function(){
				$(document).on('click', '#rand-Slide, #prev-Slide, #next-Slide', function(event){
					var mark = (($(this).prop('id')).toString()).split('-')[0];
					widget.getupLString(mark);
					event.stopPropagation();
					event.preventDefault();
				});
			},
		},
		init: function(){
			//this.clearAll();

			$("#datas").data("cur-sli", 0);
			this.setData(widget.supObj, 'lang', 'en');

			this.counter('forex');
			this.testStarter('en');
			this.events.cloneDropTexts();
			this.events.dropTexts();
			this.events.inputTexts();
			this.events.showHint();
			this.events.chooseLang();
			this.events.nextPhrase();
			this.events.dropAllText();
			this.getupLS();
			this.getupLString('rand');
			this.events.addMemo();
			this.events.removeMemo();
			this.events.resetMemo();
			this.events.showTabs();
			this.events.mixedSlide();
			this.constCount = this.counter('forex');
		},
	};
	widget.init();
})(jQuery);