document.addEventListener("DOMContentLoaded", function () {
    const ctx = document.getElementById("myChart").getContext("2d");
    const chartData = {
        labels: ["Gastos Comunes", "Servicios", "Gastos Hormiga", "Ingresos Restantes"],
        datasets: [
            {
                label: "Distribución de Gastos sobre Ingresos",
                data: [0, 0, 0, 0], // Valores iniciales
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)"
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)"
                ],
                borderWidth: 1
            }
        ],
        options: {
            responsive: true,
            maintainAspectRatio: false, // Si necesitas mantener la proporción
        }
    };

    // Crear el gráfico con Chart.js
    const myChart = new Chart(ctx, {
        type: "pie",
        data: chartData,
        options: {
            responsive: true,
        }
    });

    // Función para actualizar el gráfico con los datos actuales
    function updateChart() {
        const totalIngresos = parseFloat(document.getElementById("totalIngresos").value) || 0;
        const totalGastosComunes = parseFloat(document.getElementById("totalGastosComunes").value) || 0;
        const totalServicios = parseFloat(document.getElementById("totalServicios").value) || 0;
        const totalGastosHormiga = parseFloat(document.getElementById("totalGastosHormiga").value) || 0;

        const totalGastos = totalGastosComunes + totalServicios + totalGastosHormiga;
        const ingresosRestantes = totalIngresos - totalGastos;

        // Actualizar los datos del gráfico
        chartData.datasets[0].data = [
            totalGastosComunes,
            totalServicios,
            totalGastosHormiga,
            ingresosRestantes > 0 ? ingresosRestantes : 0
        ];
        myChart.update();
    }

    // Actualizar el gráfico después de cada cálculo de total
    window.calculateTotalIngresos = function () {
        const baseFields = ["numero1", "numero2"];
        let total = baseFields.reduce((sum, id) => sum + (parseFloat(document.getElementById(id).value) || 0), 0);
        document.querySelectorAll("#extraFieldsContainer1 input[type='number']").forEach(field => total += parseFloat(field.value) || 0);
        document.getElementById("totalIngresos").value = total;
        updateChart();
    };

    window.calculateTotalGastosComunes = function () {
        const baseFields = ["agua", "electricidad", "gas"];
        let total = baseFields.reduce((sum, id) => sum + (parseFloat(document.getElementById(id).value) || 0), 0);
        document.querySelectorAll("#extraFieldsContainer2 input[type='number']").forEach(field => total += parseFloat(field.value) || 0);
        document.getElementById("totalGastosComunes").value = total;
        updateChart();
    };

    window.calculateTotalServicios = function () {
        const baseFields = ["internet"];
        let total = baseFields.reduce((sum, id) => sum + (parseFloat(document.getElementById(id).value) || 0), 0);
        document.querySelectorAll("#extraFieldsContainer3 input[type='number']").forEach(field => total += parseFloat(field.value) || 0);
        document.getElementById("totalServicios").value = total;
        updateChart();
    };

    window.calculateTotalGastosHormiga = function () {
        let total = 0;
        document.querySelectorAll("#extraFieldsContainer4 input[type='number']").forEach(field => total += parseFloat(field.value) || 0);
        document.getElementById("totalGastosHormiga").value = total;
        updateChart();
    };
});

function mostrarFormulario() {
    // Obtén una referencia al formulario
    const formulario = document.getElementById("loginForm");

    // Aplica estilos para mostrar el formulario centrado y sobre todo
    formulario.style.display = "block";
    formulario.style.position = "fixed";  // Mantiene el formulario en la misma posición en la pantalla
    formulario.style.top = "50%";         // Centrado verticalmente
    formulario.style.left = "50%";        // Centrado horizontalmente
    formulario.style.transform = "translate(-50%, -50%)"; // Ajuste para centrar
    formulario.style.backgroundColor = "white"; // Fondo blanco para contraste
    formulario.style.padding = "20px";    // Espaciado interno
    formulario.style.zIndex = "1000";     // Aparece encima de otros elementos
    formulario.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)"; // Sombra para destacar
    formulario.style.borderRadius = "8px"; // Bordes redondeados
}

//funcion del usuario
function toggleAccordion(contentId) {
    const content = document.getElementById(contentId);
    content.style.display = (content.style.display === "none" || content.style.display === "") ? "block" : "none";
}

// Función para mostrar/ocultar el formulario de usuario
function toggleLoginForm() {
    const loginForm = document.getElementById('loginForm');
    loginForm.style.display = loginForm.style.display === 'none' || loginForm.style.display === '' ? 'block' : 'none';
}





//funcion de la notificacion
function alerta() {
    alert("¡Esto es una alerta!");
}


function toggleAccordion(contentId) {
    const content = document.getElementById(contentId);
    const toggleButton = content.previousElementSibling.querySelector(".accordion-toggle");

    if (content.classList.contains("open")) {
        content.classList.remove("open");
        toggleButton.innerHTML = "&#9662;";
    } else {
        content.classList.add("open");
        toggleButton.innerHTML = "&#9652;";
    }
}

let fieldCounters = {
    'extraFieldsContainer1': 1,
    'extraFieldsContainer2': 1,
    'extraFieldsContainer3': 1,
    'extraFieldsContainer4': 1
};

function toggleAccordion(id) {
    const element = document.getElementById(id);
    element.style.display = (element.style.display === 'none' || element.style.display === '') ? 'block' : 'none';
}

function toggleNewFieldContainer(containerId) {
    const container = document.getElementById(containerId);
    container.style.display = (container.style.display === 'none' || container.style.display === '') ? 'block' : 'none';
}

        // Función para mostrar u ocultar el contenedor del nuevo título de campo
        function toggleNewFieldContainer(id) {
            const element = document.getElementById(id);
            element.style.display = (element.style.display === 'none' || element.style.display === '') ? 'block' : 'none';  
        
        }

       // Función para agregar un campo de input dinámico
       function addInputField(containerId, titleInputId, calculateFunction) {
        const container = document.getElementById(containerId);
        const titleInput = document.getElementById(titleInputId).value;
        const counter = fieldCounters[containerId];

        if (!titleInput) {
            alert("Por favor, escribe un título para el nuevo campo.");
            return;
        }


        // Crear el contenedor del nuevo campo
            const newFieldDiv = document.createElement("div");
            newFieldDiv.classList.add("mb-3");
            newFieldDiv.setAttribute("id", `fieldGroup${containerId}${counter}`);
        
            const newLabel = document.createElement("label");
            newLabel.setAttribute("for", `extraField${containerId}${counter}`);
            newLabel.classList.add("form-label");
            newLabel.textContent = titleInput;
        
            const newInput = document.createElement("input");
            newInput.setAttribute("type", "number");
            newInput.setAttribute("id", `extraField${containerId}${counter}`);
            newInput.classList.add("form-control");
            newInput.setAttribute("name", `extraField${containerId}${counter}`);
            newInput.setAttribute("oninput", `${calculateFunction}()`);
        
            newFieldDiv.appendChild(newLabel);
            newFieldDiv.appendChild(newInput);
        
            container.appendChild(newFieldDiv);
            fieldCounters[containerId]++;
            document.getElementById(titleInputId).value = '';
        }
        function removeLastField(containerId) {
            const container = document.getElementById(containerId);
            const counter = fieldCounters[containerId] - 1;

            if (counter > 0) {
                const fieldToRemove = document.getElementById(`fieldGroup${containerId}${counter}`);
                fieldToRemove.remove();
                fieldCounters[containerId]--;
            }
        }

        // Función para alternar la visibilidad del contenido del acordeón
        function toggleAccordion(contentId) {
            const content = document.getElementById(contentId);
            content.style.display = (content.style.display === "none" || content.style.display === "") ? "block" : "none";
        }


// Calcular total de Ingresos del Usuario
function calculateTotalIngresos() {
    const baseFields = ['numero1', 'numero2'];
    let total = baseFields.reduce((sum, id) => sum + (parseFloat(document.getElementById(id).value) || 0), 0);
    document.querySelectorAll('#extraFieldsContainer1 input[type="number"]').forEach(field => total += parseFloat(field.value) || 0);
    document.getElementById('totalIngresos').value = total;
}

// Calcular total de Gastos Comunes con 3 campos estáticos
function calculateTotalGastosComunes() {
    const baseFields = ['agua', 'electricidad', 'gas']; // Añade aquí los ids de tus campos estáticos
    let total = baseFields.reduce((sum, id) => sum + (parseFloat(document.getElementById(id).value) || 0), 0);
    document.getElementById('totalGastosComunes').value = total;
}

// Calcular total de Servicios
function calculateTotalServicios() {
    const baseFields = ['internet'];
    let total = baseFields.reduce((sum, id) => sum + (parseFloat(document.getElementById(id).value) || 0), 0);
    document.querySelectorAll('#extraFieldsContainer3 input[type="number"]').forEach(field => total += parseFloat(field.value) || 0);
    document.getElementById('totalServicios').value = total;
}

// Calcular total de Gastos Hormiga
function calculateTotalGastosHormiga() {
    let total = 0;
    document.querySelectorAll('#extraFieldsContainer4 input[type="number"]').forEach(field => total += parseFloat(field.value) || 0);
    document.getElementById('totalGastosHormiga').value = total;
}

function guardarDatos() {
    // Obtiene los valores de cada campo
    const fecha = new Date().toLocaleString();
    const ingresos = parseFloat(document.getElementById('totalIngresos').value) || 0;
    const gastosComunes = parseFloat(document.getElementById('totalGastosComunes').value) || 0;
    const gastosServicios = parseFloat(document.getElementById('totalServicios').value) || 0;
    const gastosHormiga = parseFloat(document.getElementById('totalGastosHormiga').value) || 0;

    // Calcula el restante
    const restante = ingresos - (gastosComunes + gastosServicios + gastosHormiga);

    // Guarda los datos en el almacenamiento local (opcional)
    const data = { fecha, ingresos, gastosComunes, gastosServicios, gastosHormiga, restante };
    localStorage.setItem('datosFormulario', JSON.stringify(data));
    alert('Datos guardados correctamente: ' + JSON.stringify(data));

    // Agrega una fila en el historial
    const cuerpoHistorial = document.getElementById('cuerpoHistorial');
    const nuevaFila = document.createElement('tr');

    // Llena la fila con los datos en el orden adecuado
    nuevaFila.innerHTML = `
        <td>${fecha}</td>
        <td>${ingresos}</td>
        <td>${gastosComunes}</td>
        <td>${gastosServicios}</td>
        <td>${gastosHormiga}</td>
        <td>${restante}</td>
    `;

    cuerpoHistorial.appendChild(nuevaFila);
}

