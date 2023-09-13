$('.fastdelivery-slider').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  fade: false,
  infinite: true,
  dots: true,
  autoplay: false,
});


/*-----input number mask------*/
document.addEventListener("DOMContentLoaded", function () {
    var phoneInputs = document.querySelectorAll('input[data-tel-input]');
    
    var getInputNumbersValue = function (input) {
        // Return stripped input value â€” just numbers
        return input.value.replace(/\D/g, '');
    }

    var onPhonePaste = function (e) {
        var input = e.target,
            inputNumbersValue = getInputNumbersValue(input);
        var pasted = e.clipboardData || window.clipboardData;
        if (pasted) {
            var pastedText = pasted.getData('Text');
            if (/\D/g.test(pastedText)) {
                // Attempt to paste non-numeric symbol â€” remove all non-numeric symbols,
                // formatting will be in onPhoneInput handler
                input.value = inputNumbersValue;
                return;
            }
        }
    }

    var onPhoneInput = function (e) {
        var input = e.target,
            inputNumbersValue = getInputNumbersValue(input),
            selectionStart = input.selectionStart,
            formattedInputValue = "";

        if (!inputNumbersValue) {
            return input.value = "";
        }

        if (input.value.length != selectionStart) {
            // Editing in the middle of input, not last symbol
            if (e.data && /\D/g.test(e.data)) {
                // Attempt to input non-numeric symbol
                input.value = inputNumbersValue;
            }
            return;
        }

        if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
            if (inputNumbersValue[0] == "9") inputNumbersValue = "7" + inputNumbersValue;
            var firstSymbols = (inputNumbersValue[0] == "8") ? "8" : "+7";
            formattedInputValue = input.value = firstSymbols + " ";
            if (inputNumbersValue.length > 1) {
                formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
            }
            if (inputNumbersValue.length >= 5) {
                formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
            }
            if (inputNumbersValue.length >= 8) {
                formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
            }
            if (inputNumbersValue.length >= 10) {
                formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
            }
        } else {
            formattedInputValue = '+' + inputNumbersValue.substring(0, 16);
        }
        input.value = formattedInputValue;
    }
    var onPhoneKeyDown = function (e) {
        // Clear input after remove last symbol
        var inputValue = e.target.value.replace(/\D/g, '');
        if (e.keyCode == 8 && inputValue.length == 1) {
            e.target.value = "";
        }
    }
    for (var phoneInput of phoneInputs) {
        phoneInput.addEventListener('keydown', onPhoneKeyDown);
        phoneInput.addEventListener('input', onPhoneInput, false);
        phoneInput.addEventListener('paste', onPhonePaste, false);
    }
})
































window.onload = function(){
  crear_select();
}

function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};

 
var li = new Array();
function crear_select(){
var div_cont_select = document.querySelectorAll("[data-mate-select='active']");
var select_ = '';
for (var e = 0; e < div_cont_select.length; e++) {
div_cont_select[e].setAttribute('data-indx-select',e);
div_cont_select[e].setAttribute('data-selec-open','false');
var ul_cont = document.querySelectorAll("[data-indx-select='"+e+"'] > .cont_list_select_mate > ul");
 select_ = document.querySelectorAll("[data-indx-select='"+e+"'] >select")[0];
 if (isMobileDevice()) { 
select_.addEventListener('change', function () {
 _select_option(select_.selectedIndex,e);
});
 }
var select_optiones = select_.options;
document.querySelectorAll("[data-indx-select='"+e+"']  > .selecionado_opcion ")[0].setAttribute('data-n-select',e);
document.querySelectorAll("[data-indx-select='"+e+"']  > .icon_select_mate ")[0].setAttribute('data-n-select',e);
for (var i = 0; i < select_optiones.length; i++) {
li[i] = document.createElement('li');
if (select_optiones[i].selected == true || select_.value == select_optiones[i].innerHTML ) {
li[i].className = 'active';
document.querySelector("[data-indx-select='"+e+"']  > .selecionado_opcion ").innerHTML = select_optiones[i].innerHTML;
};
li[i].setAttribute('data-index',i);
li[i].setAttribute('data-selec-index',e);
// funcion click al selecionar 
li[i].addEventListener( 'click', function(){  _select_option(this.getAttribute('data-index'),this.getAttribute('data-selec-index')); });

li[i].innerHTML = select_optiones[i].innerHTML;
ul_cont[0].appendChild(li[i]);

    }; // Fin For select_optiones
  }; // fin for divs_cont_select
} // Fin Function 



var cont_slc = 0;
function open_select(idx){
var idx1 =  idx.getAttribute('data-n-select');
  var ul_cont_li = document.querySelectorAll("[data-indx-select='"+idx1+"'] .cont_select_int > li");
var hg = 0;
var slect_open = document.querySelectorAll("[data-indx-select='"+idx1+"']")[0].getAttribute('data-selec-open');
var slect_element_open = document.querySelectorAll("[data-indx-select='"+idx1+"'] select")[0];
 if (isMobileDevice()) { 
  if (window.document.createEvent) { // All
  var evt = window.document.createEvent("MouseEvents");
  evt.initMouseEvent("mousedown", false, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  slect_element_open.dispatchEvent(evt);
} else if (slect_element_open.fireEvent) { // IE
  slect_element_open.fireEvent("onmousedown");
}else {
  slect_element_open.click();
}
}else {

  
  for (var i = 0; i < ul_cont_li.length; i++) {
hg += ul_cont_li[i].offsetHeight;
}; 
 if (slect_open == 'false') {  
 document.querySelectorAll("[data-indx-select='"+idx1+"']")[0].setAttribute('data-selec-open','true');
 document.querySelectorAll("[data-indx-select='"+idx1+"'] > .cont_list_select_mate > ul")[0].style.height = hg+"px";
 document.querySelectorAll("[data-indx-select='"+idx1+"'] > .icon_select_mate")[0].style.transform = 'rotate(180deg)';
}else{
 document.querySelectorAll("[data-indx-select='"+idx1+"']")[0].setAttribute('data-selec-open','false');
 document.querySelectorAll("[data-indx-select='"+idx1+"'] > .icon_select_mate")[0].style.transform = 'rotate(0deg)';
 document.querySelectorAll("[data-indx-select='"+idx1+"'] > .cont_list_select_mate > ul")[0].style.height = "0px";
 }
}

} // fin function open_select

function salir_select(indx){
var select_ = document.querySelectorAll("[data-indx-select='"+indx+"'] > select")[0];
 document.querySelectorAll("[data-indx-select='"+indx+"'] > .cont_list_select_mate > ul")[0].style.height = "0px";
document.querySelector("[data-indx-select='"+indx+"'] > .icon_select_mate").style.transform = 'rotate(0deg)';
 document.querySelectorAll("[data-indx-select='"+indx+"']")[0].setAttribute('data-selec-open','false');
}


function _select_option(indx,selc){
 if (isMobileDevice()) { 
selc = selc -1;
}
    var select_ = document.querySelectorAll("[data-indx-select='"+selc+"'] > select")[0];

  var li_s = document.querySelectorAll("[data-indx-select='"+selc+"'] .cont_select_int > li");
  var p_act = document.querySelectorAll("[data-indx-select='"+selc+"'] > .selecionado_opcion")[0].innerHTML = li_s[indx].innerHTML;
var select_optiones = document.querySelectorAll("[data-indx-select='"+selc+"'] > select > option");
for (var i = 0; i < li_s.length; i++) {
if (li_s[i].className == 'active') {
li_s[i].className = '';
};
li_s[indx].className = 'active';

};
select_optiones[indx].selected = true;
  select_.selectedIndex = indx;
  select_.onchange();
  salir_select(selc); 
}
