//Função que recebe a URL de uma API e a executa via GET. Ela retorna o resultado
function fazGet(url){
    let request = new XMLHttpRequest();
    request.open("GET", url, false);
    request.send();
    return request;
}

function getAllCategories() {
    //Chama a função fazGet passando a URL da API de Categories
    let APIResponse = fazGet("http://diwserver.vps.webdock.cloud:8765/products/categories/");
    //Atribui o resultado da chamada da API à variável responseText
    let responseText = JSON.parse(APIResponse.responseText);
    let categoriesDropDown = document.getElementById("categoriesDropDown");
    for(i = 0; i < responseText.length; i++){
        if(responseText[i].indexOf("Footwear") != -1)
        categoriesDropDown.options[categoriesDropDown.options.length] = new Option(responseText[i], responseText[i]);
    }    
}

function getProductsByName(productName) {
    //Chama a função fazGet passando a URL da API de Categories    
    let APIResponse = fazGet("http://diwserver.vps.webdock.cloud:8765/products/search?query=" + productName);
    //Atribui o resultado da chamada da API à variável responseText
    let responseText = JSON.parse(APIResponse.responseText);

    desenharListaProdutos(responseText);
}

function getProductsByCategory(selectedCategory) {
    //Chama a função fazGet passando a URL da API de Categories    
    let APIResponse = fazGet("http://diwserver.vps.webdock.cloud:8765/products/category/" + selectedCategory);
    //Atribui o resultado da chamada da API à variável responseText
    let responseText = JSON.parse(APIResponse.responseText);

    desenharListaProdutos(responseText.products);
}

function filtraProdutosPorCategory(){
    getProductsByCategory(document.getElementById("categoriesDropDown").value);
}

function filtraProductsByName() {
    var productName = document.getElementById("CampoNomeProduto").value;
    if(productName != "")    
        getProductsByName(productName);
    else
        filtraProdutosPorCategory();
}

function desenharListaProdutos(products){
   //Cria card de produtos
   let ListaProdutosDiv = document.getElementById("ListaProdutos");
    
   ListaProdutosDiv.innerHTML = "";

    if(!products)
        return;

    for(i = 0; i < products.length; i++){
        //card de produtos   
        var divProduto = document.createElement("div");
        divProduto.classList.add("card");
        //divProduto.classList.add("pt-1");
        divProduto.classList.add("text-center");
        divProduto.style.width = "25%";

        //Cria um link para a página de detalhes, passando o id do produto
        var linkProduto = document.createElement("a");
        linkProduto.href = "detalhes.html?idProduto=" + products[i].id;

        //Cria um elemento com a imagem do produto
        var imgProduto = document.createElement("img");
        imgProduto.src = products[i].image;
        imgProduto.classList.add("card-img-top");

        //Adiciona a imagem ao link
        linkProduto.appendChild(imgProduto);

        linkProduto.innerHTML = linkProduto.innerHTML + "<b>" + 
        products[i].title + 
        "</b><br> Cor: " + products[i].baseColour + 
        "  <br>    <b>R$ " + products[i].price + "</b>";

        divProduto.appendChild(linkProduto);
        ListaProdutosDiv.appendChild(divProduto);      
    }
}