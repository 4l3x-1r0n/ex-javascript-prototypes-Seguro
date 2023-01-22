// constructores
function Seguro(marca, year, tipo) {
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}
Seguro.prototype.cotizarSeguro = function () {
    /*
        1- Americanos 1.15
        1- Asiatico 1.05
        1- Europeo 1.35
    */
    let cantidad;
    const base = 2000;
    switch (this.marca) {
        case "1":
            cantidad = base * 1.15
            break;
        case "2":
            cantidad = base * 1.05
            break;
        case "3":
            cantidad = base * 1.35
            break;
        default:
            break;
    }

    //cada año atras eel costo es 3% menos 
    const diferencia = new Date().getFullYear() - this.year;
    cantidad -= ((diferencia * 3) * cantidad) / 100;

    // si el seguro es basico es 30% mas
    // si el seguro es conpleto es 50% mas

    if (this.tipo === "basico") {

        cantidad *= 1.30;
    } else {
        cantidad *= 1.50;
    }
    return cantidad;

}

function UI() {

}
UI.prototype.fillYears = function () {
    const maxYear = new Date().getFullYear();
    const minYear = maxYear - 20;

    const year_select = document.querySelector("#year");

    for (let i = maxYear; i > minYear; i--) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        year_select.append(option);
    }
}
UI.prototype.showMsg = function (msg, tipo) {
    document.querySelector("p.mensaje")?.remove();


    const txt = document.createElement("p");
    txt.textContent = msg;
    txt.classList.add(tipo === "error" ? "error" : "correcto");
    txt.classList.add("mensaje", "mt-10");


    const content = document.querySelector("#cotizar-seguro");
    content.insertBefore(txt, content.querySelector("#resultado"));

    setTimeout(() => {
        txt.remove();
    }, 3000);
}
UI.prototype.showResult = function (total, seguro) {
    const resultadoDiv = document.querySelector("#resultado");
    resultadoDiv.firstChild?.remove();

    const { marca, year, tipo } = seguro;

    let textMarca;

    switch (marca) {
        case "1":
            textMarca = "Americano";
            break;
        case "2":
            textMarca = "Asiatico";
            break;
        case "3":
            textMarca = "Europeo";
            break;

        default:
            break;
    }

    const div = document.createElement("div");
    div.classList.add("mt-10");
    div.innerHTML = `
    <p class="header">Tu Resumen</p>
    <p class="font-bold">Marca: <span class="font-normal"> ${textMarca}</span></p>
    <p class="font-bold">Año: <span class="font-normal"> ${year}</span></p>
    <p class="font-bold">Tipo: <span class="font-normal capitalize"> ${tipo}</span></p>
    <p class="font-bold">Total: <span class="font-normal"> $ ${total}</span></p>
    `;

    //mostrar spinner
    const spinner = document.querySelector("#cargando");
    spinner.style.display = "block";
    setTimeout(() => {
        spinner.style.display = "none";
        resultadoDiv.appendChild(div);
    }, 3000);

}

const ui = new UI();

document.addEventListener("DOMContentLoaded", () => {
    ui.fillYears();
});

eventListenners();
function eventListenners() {
    const form = document.querySelector("#cotizar-seguro");
    form.addEventListener("submit", cotizarSeguro);
}

function cotizarSeguro(e) {
    e.preventDefault();
    // leer la marca seleccionada
    const marca = document.querySelector("#marca").value;

    // leer el anno seleccionado
    const year = document.querySelector("#year").value;

    // leer tipo de covertura
    const tipo = document.querySelector("input[name=\"tipo\"]:checked").value;

    if (!marca || !year || !tipo) {

        ui.showMsg("todos los campos son obligatorios", "error");
        return
    }

    ui.showMsg("Cotizando...", "exito");
    const seguro = new Seguro(marca, year, tipo);
    const total = seguro.cotizarSeguro();
    ui.showResult(total, seguro);
}

