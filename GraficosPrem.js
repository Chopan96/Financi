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
    ]
};

// Crear el gráfico con Chart.js
const myChart = new Chart(ctx, {
    type: "pie",
    data: chartData,
    options: {
        responsive: true,
        maintainAspectRatio: false
    }
});


// Declaramos una variable global para el gráfico de barras
// Variable global para el gráfico
let graficoBarras;

// Función para actualizar o crear el gráfico de barras
function actualizarGrafico(datos) {
    const etiquetas = datos.map(dato => dato.fecha);
    const ingresos = datos.map(dato => dato.ingresos);
    const gastosComunes = datos.map(dato => dato.gastosComunes);
    const gastosServicios = datos.map(dato => dato.gastosServicios);
    const gastosHormiga = datos.map(dato => dato.gastosHormiga);

    // Destruir gráfico si ya existe
    if (graficoBarras) {
        graficoBarras.destroy();
    }

    const ctx = document.getElementById('graficoBarras').getContext('2d');
    graficoBarras = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: etiquetas,
            datasets: [
                { label: 'Ingresos', data: ingresos, backgroundColor: 'rgba(75, 192, 192, 0.6)', borderColor: 'rgba(75, 192, 192, 1)', borderWidth: 1 },
                { label: 'Gastos Comunes', data: gastosComunes, backgroundColor: 'rgba(255, 99, 132, 0.6)', borderColor: 'rgba(255, 99, 132, 1)', borderWidth: 1 },
                { label: 'Gastos Servicios', data: gastosServicios, backgroundColor: 'rgba(54, 162, 235, 0.6)', borderColor: 'rgba(54, 162, 235, 1)', borderWidth: 1 },
                { label: 'Gastos Hormiga', data: gastosHormiga, backgroundColor: 'rgba(255, 206, 86, 0.6)', borderColor: 'rgba(255, 206, 86, 1)', borderWidth: 1 }
            ]
        },
        options: {
            responsive: true,
            scales: {
                x: { beginAtZero: true },
                y: { beginAtZero: true }
            }
        }
    });
}

// Función para mostrar el historial de datos guardados en la tabla
function mostrarHistorial() {
    const datosGuardados = JSON.parse(localStorage.getItem('historialDatos')) || [];
    const cuerpoHistorial = document.getElementById('cuerpoHistorial');
    
    // Limpiar historial visual
    cuerpoHistorial.innerHTML = '';

    // Agregar cada registro del historial como una fila en la tabla
    datosGuardados.forEach(dato => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${dato.fecha}</td>
            <td>${dato.ingresos}</td>
            <td>${dato.gastosComunes}</td>
            <td>${dato.gastosServicios}</td>
            <td>${dato.gastosHormiga}</td>
            <td>${dato.restante}</td>
        `;
        cuerpoHistorial.appendChild(fila);
    });
}