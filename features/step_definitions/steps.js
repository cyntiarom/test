import puppeteer from "puppeteer";
import { Given, When, Then } from "@cucumber/cucumber";
let browser, page;

Given("navegar a la url", async function () {
    //Configuracion del navegador 
   try {
        // Iniciar el navegador y abrir una nueva página
        browser = await puppeteer.launch({ headless: false, defaultViewport: { width: 1280, height: 800 } });
        page = await browser.newPage();
        
        await page.goto("https://www.mercadolibre.com");

        //caputura de pantalla
        await page.screenshot({ path: 'features/screenshots/1_portal_MercadoLibre.png', fullPage: true });

    }
    catch (error) {
      console.error("Error al iniciar el navegador:", error);
   }

});

When("Selecciona país", async function () {
  try {
      // Esperar a que el menú de navegación esté disponible
      await page.waitForSelector('li[class="ml-site-mlm"]',{visible: true ,timeout: 5000}); 

      // Buscar y hacer clic en el enlace o botón que corresponde a "México"
      const mexicoSelector = 'a[href*="México"], a[id="MX"]'; 
      await page.waitForSelector(mexicoSelector,{visible: true ,timeout: 10000});
      //caputura de pantalla
      await page.screenshot({ path: 'features/screenshots/2_seleccion_pais.png', fullPage: true });
      await page.click(mexicoSelector);

     
  }
    catch (error) {
      console.error("Error al iniciar el navegador:", error);
   }
 
});

Then("Buscar producto", async function () {
  try {
     // Esperar a que el campo de búsqueda esté disponible
     const searchInputSelector = 'input[name="as_word"]' ; 
     await page.waitForSelector(searchInputSelector);
 
     // Escribir el nombre del producto en el campo de búsqueda
     const producto = "playstation 5"; 
     await page.type(searchInputSelector, producto);
 
     // Hacer clic en el botón de búsqueda
     const searchButtonSelector = 'button[type="submit"]'; 
     await page.waitForSelector(searchButtonSelector);
     await page.click(searchButtonSelector);
 
     // Esperar a que los resultados de búsqueda se carguen
     const resultsSelector = ".ui-search-results"; 
     await page.waitForSelector(resultsSelector);

     
      //caputura de pantalla
      await page.screenshot({ path: 'features/screenshots/3_seleccion_producto.png', fullPage: true });

  }
    catch (error) {
      console.error("Error al iniciar el navegador:", error);
  }
   
  });

  Then("Filtrar por condición Nuevos", async function () {
     try {
        // Esperar a que el filtro de condición esté disponible
      
        const nvoSelector = '.ui-search-filter-dl'; 
        await page.waitForSelector(nvoSelector);

        await page.locator('.ui-search-filter-dl a[title^="Nuevo"]').click();
       //caputura de pantalla
      await page.screenshot({ path: 'features/screenshots/4_condicion_nvo.png', fullPage: true });
        // Esperar a que los resultados se actualicen
        const resultsSelector = ".ui-search-results"; 
        await page.waitForSelector(resultsSelector,{ visible: true, timeout: 10000 });

        console.log("Filtro aplicado: Condición 'Nuevo'.");
        
     
    }
    catch (error) {
      console.error("Error al iniciar el navegador:", error);
   }
});

Then("Filtrar por ubicación", async function () {
   try {
      // Esperar a que el filtro de condición esté disponible
      const edoSelector='.ui-search-filter-dl';
      await page.waitForSelector(edoSelector);
      await page.locator('.ui-search-filter-dl a[title^="Distrito Federal"]').click();
    
      // Esperar a que los resultados se actualicen
      const resultsSelector = ".ui-search-results";
      await page.waitForSelector(resultsSelector);

      console.log("Filtro aplicado: Condición 'Distrito Federal'.");
      
      //caputura de pantalla
      await page.screenshot({ path: 'features/screenshots/5_condicion_ubicacion.png', fullPage: true });
    }
    catch (error) {
      console.error("Error al iniciar el navegador:", error);
   }
});

When("Ordenar de mayor a menor precio", async function () {
   try {
     
       // Esperar a que el menú de ordenación esté disponible
      const orderSelector = '.andes-dropdown__trigger'; 
      await page.waitForSelector(orderSelector,{ visible: true, timeout: 10000 });
      await page.locator(orderSelector).click();
     

    const orderOptionSelector = 'li[data-key="price_desc"]'; // Selector de la opción "Mayor precio"
    await page.waitForSelector(orderOptionSelector,{ visible: true, timeout: 10000 });
    await page.click('li[data-key="price_desc"]');

    // Esperar a que los resultados se actualicen
    const resultsSelector = ".ui-search-results"; 
    await page.waitForSelector(resultsSelector);

    console.log("Orden aplicado: De mayor a menor precio.");   
    
      //caputura de pantalla
      await page.screenshot({ path: 'features/screenshots/6_orden.png', fullPage: true });
  }
    catch (error) {
      console.error("Error al iniciar el navegador:", error);
   }
    
});

 Then('Obtén el nombre y el precio de los 5 primeros productos', async function () {
          // Obtener los nombres y precios de los primeros 5 productos
    const productos = await page.evaluate(() => {
        const items = Array.from(document.querySelectorAll(".ui-search-layout__item"));
        return items.slice(0, 5).map(item => {
            const nombre = item.querySelector(".poly-component__title-wrapper a")?.textContent.trim();
            const precio = item.querySelector(".andes-money-amount__fraction")?.textContent.trim();
            return { nombre, precio };
        });
    });

    // Imprimir los productos en la consola
    console.log("Productos encontrados:");
    productos.forEach((producto, index) => {
        console.log(`${index + 1}. ${producto.nombre} - $${producto.precio}`);
    });
          
          
  });
