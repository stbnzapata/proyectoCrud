const urlEmpresa = 'http://localhost:3050/empresa'
const urlMaquina = 'http://localhost:3050/maquina'
const urlFuncionario = 'http://localhost:3050/funcionario'

const contenedorEmpresa = document.getElementById('tbEmpresa');
const contenedorMaquina = document.getElementById('tbMaquina');
const contenedorFuncionario = document.getElementById('tbFuncionario');

let resultadoEmpresa = '';
let resultadoMaquina = '';
let resultadoFuncionario = '';

const modalEmpresa = new bootstrap.Modal(document.getElementById('modalEmpresa'));
const modalMaquina = new bootstrap.Modal(document.getElementById('modalMaquina'));
const modalFuncionario = new bootstrap.Modal(document.getElementById('modalFuncionario'));

const formEmpresa = document.getElementById('formEmpresa');
const formMaquina = document.getElementById('formMaquina');
const formFuncionario = document.getElementById('formFuncionario');

const idEmpresa = document.getElementById('id-empresa');
const textName = document.getElementById('text-name');
const textDirection = document.getElementById('text-direction');

const idMaquina = document.getElementById('id-maquina');
const idEmpresaMaquina = document.getElementById('id-empresa-maquina');
const textMaquina = document.getElementById('text-maquina');
const ubicacion = document.getElementById('text-ubicacion');

const idFuncionario = document.getElementById('id-funcionario');
const idMaquinaFuncionario = document.getElementById('id-maquina-funcionario');
const nombreFuncionario = document.getElementById('text-nombre-funcionario');
const apellidoFuncionario = document.getElementById('text-apellido-funcionario');
const cargoFuncionario = document.getElementById('text-cargo');

let opcion = '';

// modal crear

btnCrearEmpresa.addEventListener('click', () => {
    // idEmpresa.value = '';
    textName.value = '';
    textDirection.value = '';
    modalEmpresa.show();
    opcion = 'crear';
});


btnCrearMaquina.addEventListener('click', () => {
    // idMaquina.value = '';
    idEmpresaMaquina.value = '';
    textMaquina.value = '';
    ubicacion.value = '';
    modalMaquina.show();
    opcion = 'crear';
});

btnCrearFuncionario.addEventListener('click', () => {
    idFuncionario.value = '';
    idMaquinaFuncionario.value = '';
    nombreFuncionario.value = '';
    apellidoFuncionario.value = '';
    cargoFuncionario.value = '';
    modalFuncionario.show();
    opcion = 'crear';
});

// Mostrar

const mostrarEmpresa = (empresas) => {
    empresas.forEach(empresa => {
        resultadoEmpresa += `<tr>
            <td>${empresa.idEmpresa}</td>
            <td>${empresa.nomEmpresa}</td>
            <td>${empresa.direccion}</td>
            <td class="text-center">
                <button class="btnEditarEmpresa btn btn-primary">Editar</button>
                <button class="btnEliminarEmpresa btn btn-danger">Eliminar</button>
            </td>
        </tr>
        `
    });
    contenedorEmpresa.innerHTML = resultadoEmpresa;
}

fetch(urlEmpresa)
    .then(response => response.json())
    .then(data => mostrarEmpresa(data))
    .catch(error => console.log(error));

const mostrarMaquina = (maquinas) => {
    maquinas.forEach(maquina => {
        resultadoMaquina += `<tr>
            <td>${maquina.idMaquina}</td>
            <td>${maquina.idEmpresa}</td>
            <td>${maquina.nomMaquina}</td>
            <td>${maquina.ubicacion}</td>
            <td class="text-center">
                <button class="btnEditarMaquina btn btn-primary">Editar</button>
                <button class="btnEliminarMaquina btn btn-danger">Eliminar</button>
            </td>
        </tr>
        `
    });
    contenedorMaquina.innerHTML = resultadoMaquina;
}

fetch(urlMaquina)
    .then(response => response.json())
    .then(data => mostrarMaquina(data))
    .catch(error => console.log(error));

const mostrarFuncionario = (funcionarios) => {
    funcionarios.forEach(funcionario => {
        resultadoFuncionario += `<tr>
            <td>${funcionario.idFuncionario}</td>
            <td>${funcionario.idMaquina}</td>
            <td>${funcionario.nombre}</td>
            <td>${funcionario.apellido}</td>
            <td>${funcionario.cargo}</td>
            <td class="text-center">
                <button class="btnEditarFuncionario btn btn-primary">Editar</button>
                <button class="btnEliminarFuncionario btn btn-danger">Eliminar</button>
            </td>
        </tr>
        `
    });
    contenedorFuncionario.innerHTML = resultadoFuncionario;
}

fetch(urlFuncionario)
    .then(response => response.json())
    .then(data => mostrarFuncionario(data))
    .catch(error => console.log(error));

const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if (e.target.closest(selector)) {
            handler(e);
        }
    })
}

// Eliminar

on(document, 'click', '.btnEliminarEmpresa', e => {
    const fila = e.target.parentNode.parentNode;
    const id = fila.children[0].innerText;
    dalert.ReplaceConfirm();
    confirm("Estas seguro de eliminar esta Empresa?", "Eliminar Empresa", function (result) {
        if (result) {
            fetch(urlEmpresa + "/" + id, {
                method: 'DELETE',
            })            
            .then(data => {if(data.status === 400){
                    dalert.ReplaceAlert();
                    alert("No se puede eliminar esta empresa porque tiene maquinas asociadas"); 
                }else{
                    location.reload();
                }
            })
        }
    });
})

on(document, 'click', '.btnEliminarMaquina', e => {
    const fila = e.target.parentNode.parentNode;
    const id = fila.children[0].innerText;
    dalert.ReplaceConfirm();
    confirm("Estas seguro de eliminar esta Maquina?", "Eliminar Maquina", function (result) {
        if (result) {
            fetch(urlMaquina + "/" + id, {
                method: 'DELETE',
            })            
            .then(data => {if(data.status === 400){
                    dalert.ReplaceAlert();
                    alert("No se puede eliminar esta maquina porque tiene funcionarios asociados"); 
                }
            })
            .then(() => location.reload());
        }
    });
})

on(document, 'click', '.btnEliminarFuncionario', e => {
    const fila = e.target.parentNode.parentNode;
    const id = fila.children[0].innerText;
    dalert.ReplaceConfirm();
    confirm("Estas seguro de eliminar este Funcionario?", "Eliminar Funcionario", function (result) {        
        if (result) {
            fetch(urlFuncionario + "/" + id, {
                method: 'DELETE',
            })            
            .then(data => {if(data.status === 400){
                    dalert.ReplaceAlert();
                    alert("Eliminar Funcionario", "Ha ocurrido un error eliminando al funcionario intente mas tarde");
                }
            })
            .then(() => location.reload());
        }
    });
})

// modal Editar

on(document, 'click', '.btnEditarEmpresa', e => {
    const fila = e.target.parentNode.parentNode;
    
    const idEmpresa1 = fila.children[0].innerText;
    const nomEmpresa = fila.children[1].innerText;
    const direccion = fila.children[2].innerText;

    idEmpresa.value = idEmpresa1;
    textName.value = nomEmpresa;
    textDirection.value = direccion;

    opcion = "editar";
    modalEmpresa.show();
    
})

on(document, 'click', '.btnEditarMaquina', e => {
    const fila = e.target.parentNode.parentNode;
    const idMaquina1 = fila.children[0].innerText;
    const idEmpresa1 = fila.children[1].innerText;
    const nomMaquina1 = fila.children[2].innerText;
    const ubicacion1 = fila.children[3].innerText;
    
    idMaquina.value = idMaquina1;
    idEmpresaMaquina.value = idEmpresa1;
    textMaquina.value = nomMaquina1;
    ubicacion.value = ubicacion1;
    
    opcion = "editar";
    modalMaquina.show();
})

on(document, 'click', '.btnEditarFuncionario', e => {
    const fila = e.target.parentNode.parentNode;
    const idFuncionario1 = fila.children[0].innerText;
    const idMaquina1 = fila.children[1].innerText;
    const nombre1 = fila.children[2].innerText;
    const apellido1 = fila.children[3].innerText;
    const cargo1 = fila.children[4].innerText;
    
    idFuncionario.value = idFuncionario1;
    idMaquinaFuncionario.value = idMaquina1;
    nombreFuncionario.value = nombre1;
    apellidoFuncionario.value = apellido1;
    cargoFuncionario.value = cargo1;

    opcion = "editar";
    modalFuncionario.show();
})

// crear y editar

formEmpresa.addEventListener('submit', e => {
    e.preventDefault()
    if(opcion === "crear"){
        fetch(urlEmpresa, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nomEmpresa: textName.value,
                direccion: textDirection.value
            })
        })
        .then(response => response.json())
        .then(data => {
            const nuevaEmpresa = [];
            nuevaEmpresa.push(data);
            mostrarEmpresa(nuevaEmpresa);
        })
    }
    if(opcion === "editar"){
        fetch(urlEmpresa + "/" + idEmpresa.value, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nomEmpresa: textName.value,
                direccion: textDirection.value
            })
        })
        .then(response => response.json())
    }
    location.reload()
    modalEmpresa.hide();
});

formMaquina.addEventListener('submit', e => {
    e.preventDefault()
    if(opcion === "crear"){
        fetch(urlMaquina, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idEmpresa: idEmpresaMaquina.value,
                nomMaquina: textMaquina.value,
                ubicacion: ubicacion.value
            })
        })
        .then(response => response.json())
        .then(data => {
            const nuevaMaquina = [];
            nuevaMaquina.push(data);
            mostrarMaquina(nuevaMaquina);
        })
    }
    if(opcion === "editar"){
        fetch(urlMaquina + "/" + idMaquina.value, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idEmpresa: idEmpresaMaquina.value,
                nomMaquina: textMaquina.value,
                ubicacion: ubicacion.value
            })
        })
        .then(response => response.json())
    }
    location.reload()
    modalMaquina.hide();
});

formFuncionario.addEventListener('submit', e => {
    e.preventDefault()
    if(opcion === "crear"){
        fetch(urlFuncionario, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idMaquina: idMaquinaFuncionario.value,
                nombre: nombreFuncionario.value,
                apellido: apellidoFuncionario.value,
                cargo: cargoFuncionario.value
            })
        })
        .then(response => response.json())
        .then(data => {
            const nuevoFuncionario = [];
            nuevoFuncionario.push(data);
            mostrarMaquina(nuevoFuncionario);
        })
    }
    if(opcion === "editar"){
        fetch(urlFuncionario + "/" + idFuncionario.value, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idMaquina: idMaquinaFuncionario.value,
                nombre: nombreFuncionario.value,
                apellido: apellidoFuncionario.value,
                cargo: cargoFuncionario.value
            })
        })
        .then(response => response.json())
    }
    location.reload()
    modalFuncionario.hide();
});