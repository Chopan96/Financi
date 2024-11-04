document.addEventListener("DOMContentLoaded", function () {

    // Función para actualizar el gráfico con los datos actuales
    function updateChart() {
        const totalIngresos = parseFloat(document.getElementById("totalIngresos").value) || 0;
        const totalGastosComunes = parseFloat(document.getElementById("totalGastosComunes").value) || 0;
        const totalServicios = parseFloat(document.getElementById("totalServicios").value) || 0;
        const totalGastosHormiga = parseFloat(document.getElementById("totalGastosHormiga").value) || 0;

        const totalGastos = totalGastosComunes + totalServicios + totalGastosHormiga;
        const ingresosRestantes = totalIngresos - totalGastos;

        chartData.datasets[0].data = [
            totalGastosComunes,
            totalServicios,
            totalGastosHormiga,
            ingresosRestantes > 0 ? ingresosRestantes : 0
        ];
        myChart.update();

        const fechaActual = new Date().toLocaleDateString();
        lineChartData.labels.push(fechaActual);
        lineChartData.datasets[0].data.push(totalIngresos);
        lineChartData.datasets[1].data.push(totalGastos);
    
        lineChart.update();
    
    }

    // Función para calcular los totales y actualizar el gráfico y los valores en pantalla
    function calculateTotal(inputIds, containerId, totalId) {
        let total = inputIds.reduce((sum, id) => sum + (parseFloat(document.getElementById(id).value) || 0), 0);
        document.querySelectorAll(`#${containerId} input[type='number']`).forEach(field => total += parseFloat(field.value) || 0);
        document.getElementById(totalId).value = total;
        updateChart();
        updateTotalesSection();
    }

    // Funciones de cálculo individuales para cada sección
    window.calculateTotalIngresos = function () {
        calculateTotal(["numero1", "numero2"], "extraFieldsContainer1", "totalIngresos");
    };

    window.calculateTotalGastosComunes = function () {
        calculateTotal(["agua", "electricidad", "gas"], "extraFieldsContainer2", "totalGastosComunes");
    };

    window.calculateTotalServicios = function () {
        calculateTotal(["internet"], "extraFieldsContainer3", "totalServicios");
    };

    window.calculateTotalGastosHormiga = function () {
        calculateTotal([], "extraFieldsContainer4", "totalGastosHormiga");
    };

    // Función para actualizar la sección de totales en pantalla
    function updateTotalesSection() {
        // Tomar los valores y convertirlos a números (si están vacíos, se asigna 0)
        const totalIngresos = parseFloat(document.getElementById("totalIngresos").value) || 0;
        const totalGastosComunes = parseFloat(document.getElementById("totalGastosComunes").value) || 0;
        const totalServicios = parseFloat(document.getElementById("totalServicios").value) || 0;
        const totalGastosHormiga = parseFloat(document.getElementById("totalGastosHormiga").value) || 0;
    
        // Calcular el total general
        const totalGeneral = totalIngresos - (totalGastosComunes + totalServicios + totalGastosHormiga);
    
        // Asignar valores a los campos de entrada en el resumen
        document.getElementById("resumenIngresos").value = totalIngresos;
        document.getElementById("resumenGastosComunes").value = totalGastosComunes;
        document.getElementById("resumenServicios").value = totalServicios;
        document.getElementById("resumenGastosHormiga").value = totalGastosHormiga;
        document.getElementById("totalGeneral").value = totalGeneral;
    }
    

    // Función para mostrar el formulario de usuario en un popup centrado
    window.mostrarFormulario = function () {
        const formulario = document.getElementById("loginForm");
        formulario.style.display = "block";
        formulario.style.position = "fixed";
        formulario.style.top = "50%";
        formulario.style.left = "50%";
        formulario.style.transform = "translate(-50%, -50%)";
        formulario.style.backgroundColor = "white";
        formulario.style.padding = "20px";
        formulario.style.zIndex = "1000";
        formulario.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
        formulario.style.borderRadius = "8px";
    };

    // Función para alternar la visibilidad de contenido
    window.toggleAccordion = function (contentId) {
        const content = document.getElementById(contentId);
        content.style.display = (content.style.display === "none" || content.style.display === "") ? "block" : "none";
    };

    // Función para alternar el contenedor de campos adicionales
    window.toggleNewFieldContainer = function (containerId) {
        const container = document.getElementById(containerId);
        container.style.display = (container.style.display === "none" || container.style.display === "") ? "block" : "none";
    };

    // Agregar un campo de entrada adicional
    window.addInputField = function (containerId, titleInputId, calculateFunction) {
        const container = document.getElementById(containerId);
        const titleInput = document.getElementById(titleInputId).value;

        if (!titleInput) {
            alert("Por favor, escribe un título para el nuevo campo.");
            return;
        }

        const newFieldDiv = document.createElement("div");
        const newLabel = document.createElement("label");
        const newInput = document.createElement("input");

        newLabel.textContent = titleInput;
        newInput.type = "number";
        newInput.oninput = window[calculateFunction];
        newFieldDiv.appendChild(newLabel);
        newFieldDiv.appendChild(newInput);
        container.appendChild(newFieldDiv);
        
        document.getElementById(titleInputId).value = '';
    };

    // Remover el último campo agregado
    window.removeLastField = function (containerId) {
        const container = document.getElementById(containerId);
        const lastField = container.lastElementChild;
        if (lastField) container.removeChild(lastField);
    };
});

// Modificar la función guardarDatos para agregar el historial y actualizar el gráfico
function guardarDatos() {
    const fecha = new Date().toLocaleString();
    const ingresos = parseFloat(document.getElementById('totalIngresos').value) || 0;
    const gastosComunes = parseFloat(document.getElementById('totalGastosComunes').value) || 0;
    const gastosServicios = parseFloat(document.getElementById('totalServicios').value) || 0;
    const gastosHormiga = parseFloat(document.getElementById('totalGastosHormiga').value) || 0;

    const restante = ingresos - (gastosComunes + gastosServicios + gastosHormiga);
    const nuevoDato = { fecha, ingresos, gastosComunes, gastosServicios, gastosHormiga, restante };

    const datosGuardados = JSON.parse(localStorage.getItem('historialDatos')) || [];
    datosGuardados.push(nuevoDato);
    localStorage.setItem('historialDatos', JSON.stringify(datosGuardados));

    alert('Datos guardados correctamente: ' + JSON.stringify(nuevoDato));

    // Mostrar el historial actualizado
    mostrarHistorial();

    // Actualizar el gráfico con los datos guardados
    actualizarGrafico(datosGuardados);
}

// Al cargar la página, mostrar historial y gráfico
window.onload = function() {
    const datosGuardados = JSON.parse(localStorage.getItem('historialDatos')) || [];
    mostrarHistorial();
    actualizarGrafico(datosGuardados);
};