//var
const presupuestousuario = prompt('Cual es tu presupueso semanal?');
const formulario=document.getElementById('agregar-gasto');
let cantidadPresupuesto;


// console.log(presupuestousuario);
//class
class Presupuesto {
    constructor(presupesto) {
        this.presupuesto = Number(presupesto);
        this.restante = Number(presupesto);
    }
    presupestoRestante(cantidad = 0) {
        return this.restante -= Number(cantidad);
    }
}

class Interfaz {
    insertarPresupuesto(cantidad) {
        const presupuestoSpan=document.querySelector('span#total');
        const restanteSpan=document.querySelector('span#restante');

        //insert
        presupuestoSpan.innerHTML=`${cantidad}`;
        restanteSpan.innerHTML=`${cantidad}`;

    }
    imprimirMensaje(mensaje,tipo){
        const divMensaje=document.createElement('div');
        divMensaje.classList.add('text-center','alert');
        if(tipo==='error'){
            divMensaje.classList.add('alert-danger')
        }else{
            divMensaje.classList.add('alert-success');
        }
        divMensaje.appendChild(document.createTextNode(mensaje));
        
        document.querySelector('.primario').insertBefore(divMensaje,formulario);

        setTimeout(() => {
            document.querySelector('.primario .alert').remove();
            formulario.reset();
        }, 1500);
    }
    agregarGastoListado(nombreGasto,cantidadGasto){
        const gastosListado=document.querySelector('#gastos ul');

        const li=document.createElement('li');

        li.className='list-group-item d-flex justify-content-between align-items-center';

        li.innerHTML=`
        ${nombreGasto}
        <span class="badge badge-primary badge-pill"> $ ${cantidadGasto}</span>
        `;
        gastosListado.appendChild(li);
    }
    prespuestoRestante(cantidadGasto){
        const restante=document.querySelector('span#restante');

        const presupestoRestanteUsuario=cantidadPresupuesto.presupestoRestante(cantidadGasto);
        console.log(presupestoRestanteUsuario);
        restante.innerHTML=`${presupestoRestanteUsuario}`;
        this.comprobarPresupuesto();
    }
    comprobarPresupuesto(){
        const prespuestoTotal=cantidadPresupuesto.presupuesto;
        const presupuestoRestante=cantidadPresupuesto.restante;

        if(prespuestoTotal/4>presupuestoRestante){
            const restante=document.querySelector('.restante');
            restante.classList.remove('alert-success', 'alert-warning');
            restante.classList.add('alert-danger');
        }else if(prespuestoTotal/2>presupuestoRestante){
            const restante=document.querySelector('.restante');
            restante.classList.remove('alert-success');
            restante.classList.add('alert-warning');
        }
    }
}
//eventt

document.addEventListener('DOMContentLoaded', () => {
    if (presupuestousuario === null || presupuestousuario === '') {
        window.location.reload();
    } else {
        cantidadPresupuesto = new Presupuesto(presupuestousuario);
        const ui = new Interfaz();
        ui.insertarPresupuesto(cantidadPresupuesto.presupuesto);
    }
});
formulario.addEventListener('submit',(e)=>{
    e.preventDefault();
    const nombreGasto=document.querySelector('#gasto').value;
    const cantidadGasto=document.querySelector('#cantidad').value;

    //
    const ui=new Interfaz();

    if(nombreGasto ===''||cantidadGasto==='' || nombreGasto===null || cantidadGasto===null){
        ui.imprimirMensaje('Hubo un error','error');
    }else{
        ui.imprimirMensaje('Se agrego correctamente','correcto');
        ui.agregarGastoListado(nombreGasto,cantidadGasto);
        ui.prespuestoRestante(cantidadGasto);
    }
})