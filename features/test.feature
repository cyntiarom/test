Feature: Automatizacion de pruebas

        Scenario: Test Case 1: abrir un navegador
            Given navegar a la url 
             When Selecciona país 
             And Buscar producto
             And Filtrar por condición Nuevos 
             And Filtrar por ubicación 
             And Ordenar de mayor a menor precio
             Then Obtén el nombre y el precio de los 5 primeros productos
             