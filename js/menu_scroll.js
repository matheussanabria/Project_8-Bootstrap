$(function(){
    // alert("loaded");
    // declarando a variavel link
    var link = $('nav > ul > li > a'); // link tem seu valor definido como tag a

    // declarando a função clicar no link
    link.click(function(){
        // declarando a variavel href
        var href = $(this).attr('href'); // href tem seu valor definido como este atributo href
        // declarando a variavel offSetTop
        var offSetTop = $(href).offset().top; // offSetTop tem seu valor definido como topo do href

        // declarando a variavel body
        var body = $('html, body'); // body tem seu valor definido como tags html e body
        // animando a variável do corpo
        body.animate({'scrollTop': offSetTop}) // Rolagem para cima com ajuste adicional

        return false;
    });
});
