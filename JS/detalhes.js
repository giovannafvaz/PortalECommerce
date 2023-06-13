function onLoadDetalhes(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    var idProduto = urlParams.get('idProduto');
    //Chama a função fazGet passando a URL da API de Categories
    let APIResponse = fazGet("http://diwserver.vps.webdock.cloud:8765/products/" + idProduto);
    //Atribui o resultado da chamada da API à variável responseText
    let responseText = JSON.parse(APIResponse.responseText);
    console.log(responseText);
}


onLoadDetalhes();