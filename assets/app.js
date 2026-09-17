/* Reparación Whirlpool Valladolid — app.js (JS puro, sin dependencias, sin peticiones externas) */
(function () {
  'use strict';
  var CONFIG = {
    TEL: '641 153 922', TEL_HREF: 'tel:+34641153922',
    WA: '641 153 922', WA_BASE: 'https://wa.me/34641153922?text=',
    MARCA: 'Whirlpool', MARCA_RE: /\b(WHIRLPOOL|INDESIT|IGNIS|HOTPOINT)\b/g, SAT_TXT: '<a href="https://www.whirlpool.es/soporte" rel="nofollow noopener" target="_blank">whirlpool.es</a> · 932 382 355', ETIQUETA: 'número de modelo', F_ES_E: false,
    FORM_ENDPOINT: '' /* vacío = envío por WhatsApp (canal citado en Privacidad); si se activa un proveedor, actualizar Privacidad */
  };
  var CODIGOS=[{"id":"f05-lavadora","cod":"F05 / FP","ap":"lavadora","keys":["F05","F5","FP"],"titulo":"No desagua (F05 desde 2014 · FP antes de 2014)","sig":"No vacía el agua: bomba, filtro o tubo obstruido. En las de 2014 en adelante es F05; en las AWO/D, AWOE y AWE de 2005–2013 es FP (ahí F05 significa sonda de temperatura, y toca llamar).","pasos":["Vaciar y limpiar el filtro de la bomba (abajo a la derecha)","Revisar el tubo de desagüe sin dobleces y el sifón","Si es anterior a 2014 y marca F05 (no FP), no limpiar nada: llamar"],"sem":"verde","llamar":"Filtro limpio y sigue igual → bomba de desagüe. F05 en una lavadora anterior a 2014 → sonda NTC, siempre."},{"id":"f06-lavadora","cod":"F06 / FdL / FdU","ap":"lavadora","keys":["F06","F6","FDL","FDU"],"titulo":"Puerta: no bloquea o no desbloquea","sig":"Fallo del cierre de puerta: no abre, no cierra o no arranca. En las de 2014 en adelante es F06; en las de 2005–2013, FdL (no bloquea) o FdU (no desbloquea). Ojo: F06 en una AWO/D o AWE antigua es el tacómetro del motor.","pasos":["Cerrar la puerta con firmeza y retirar ropa atrapada","Mirar si hay algo obstruyendo el gancho del cierre","Con FdU, esperar 3 minutos a que baje el agua antes de abrir"],"sem":"verde","llamar":"Persiste con la puerta bien cerrada → blocapuertas. F06 en una lavadora anterior a 2014 → motor/tacómetro, siempre."},{"id":"f01-lavadora","cod":"F01","ap":"lavadora","keys":["F01","F1"],"titulo":"Placa electrónica o circuito del motor","sig":"No se pueden seleccionar funciones o el tambor no gira: placa de control o circuito del motor (modelos de 2014 en adelante).","pasos":["Desenchufar 2 minutos, enchufar, esperar 30 segundos y reintentar"],"sem":"ambar","llamar":"Si repite tras el reinicio: placa o motor."},{"id":"f02-lavadora","cod":"F02","ap":"lavadora","keys":["F02","F2"],"titulo":"Circuito del motor (tacómetro o escobillas)","sig":"El tambor gira a tirones o no gira: tacómetro o escobillas del motor, típico en lavadoras de más de 5 años.","pasos":["Desenchufar 2 minutos y reintentar una sola vez"],"sem":"ambar","llamar":"Siempre: escobillas o motor; el reinicio solo confirma."},{"id":"f03-lavadora","cod":"F03","ap":"lavadora","keys":["F03","F3"],"titulo":"Sonda de temperatura (NTC)","sig":"La sonda que mide la temperatura del agua falla: no calienta o el programa se alarga (2014 en adelante).","pasos":[],"sem":"ambar","llamar":"Siempre."},{"id":"f07-lavadora","cod":"F07","ap":"lavadora","keys":["F07","F7"],"titulo":"Placa: calentamiento o triac del motor","sig":"En las de 2014 en adelante, circuito de calentamiento en la placa (se para a mitad, no calienta, bomba en continuo); en las de 2005–2013, triac del motor en cortocircuito. En ambas, placa electrónica.","pasos":["Desenchufar 5 minutos y reintentar una sola vez"],"sem":"ambar","llamar":"Siempre: es la placa en las dos generaciones."},{"id":"f08-lavadora","cod":"F08","ap":"lavadora","keys":["F08","F8"],"titulo":"Resistencia de calentamiento","sig":"El programa se para a mitad y no calienta: resistencia o su circuito (2014 en adelante). En las de 2005–2013 las fuentes no coinciden (cierre de puerta o resistencia): mejor llamar.","pasos":["Cerrar bien la puerta y reiniciar una sola vez"],"sem":"ambar","llamar":"Siempre si repite."},{"id":"f09-lavadora","cod":"F09","ap":"lavadora","keys":["F09","F9"],"titulo":"Software (2014+) · sobrellenado (antes de 2014)","sig":"En las de 2014 en adelante: fallo de software, varias luces parpadean y no acepta programa. En las AWO/D, AWOE y AWE de 2005–2013: nivel de agua demasiado alto.","pasos":["Desenchufar 2 minutos y reintentar","Si es anterior a 2014, cerrar el grifo del agua"],"sem":"ambar","llamar":"Persiste: reprogramar o cambiar la placa; en las antiguas, electroválvula o presostato."},{"id":"f11-lavadora","cod":"F11","ap":"lavadora","keys":["F11"],"titulo":"Bomba (2014+) · comunicación entre placas (antes)","sig":"En las de 2014 en adelante, circuito de la bomba: no evacúa. En las de 2005–2013, fallo de comunicación entre placas.","pasos":["Desenchufar 5 minutos y reintentar","Limpiar el filtro de la bomba por si es un F05 encubierto"],"sem":"ambar","llamar":"Siempre si repite."},{"id":"f12-lavadora","cod":"F12","ap":"lavadora","keys":["F12"],"titulo":"Control electrónico: no enciende","sig":"Fallo de comunicación entre la placa de control y el display: la lavadora no enciende o no responde (2014 en adelante).","pasos":["Desenchufar 2 minutos y reintentar"],"sem":"ambar","llamar":"Persiste tras el reinicio."},{"id":"f13-lavadora","cod":"F13","ap":"lavadora","keys":["F13"],"titulo":"Dosificador de detergente (2005–2013)","sig":"Circuito del dosificador o dispensador en las AWO/D, AWOE y AWE. En las lavasecadoras de 2014 en adelante, F13 es la sonda de secado.","pasos":["Limpiar la cubeta de detergente y su alojamiento"],"sem":"verde","llamar":"Persiste con la cubeta limpia."},{"id":"f14-lavadora","cod":"F14 / F15","ap":"lavadora","keys":["F14","F15"],"titulo":"Memoria de la placa o control del motor (2005–2013)","sig":"F14: memoria (EEPROM) de la placa. F15: unidad de control del motor. Ambos en las AWO/D, AWOE y AWE.","pasos":["Desenchufar 5 minutos y reintentar una sola vez"],"sem":"ambar","llamar":"Siempre."},{"id":"f16-lavadora","cod":"F16","ap":"lavadora","keys":["F16"],"titulo":"Posición del tambor (carga superior)","sig":"Solo en carga superior TDLR: el sensor de posición del tambor no lo deja en el sitio correcto para abrir.","pasos":[],"sem":"ambar","llamar":"Siempre."},{"id":"f18-lavadora","cod":"F18","ap":"lavadora","keys":["F18"],"titulo":"Error interno de datos","sig":"Display o funciones muertas por un error interno de la placa (2014 en adelante).","pasos":["Desenchufar 2 minutos y reintentar"],"sem":"ambar","llamar":"Persiste tras el reinicio."},{"id":"fh-lavadora","cod":"FH / H2O","ap":"lavadora","keys":["FH","H2O","H20"],"titulo":"No entra agua","sig":"No llega agua en el tiempo previsto. En las Whirlpool de 2005–2013 se muestra FH; en la plataforma de 2014 en adelante (Indesit y Hotpoint sobre todo), H2O.","pasos":["Grifo abierto y manguera sin dobleces","Limpiar el filtro de la entrada de agua (junto a la manguera)","Comprobar que hay presión en el grifo"],"sem":"verde","llamar":"Con agua y presión, y sigue igual → electroválvula o presostato."},{"id":"fa-lavadora","cod":"FA","ap":"lavadora","keys":["FA"],"titulo":"AquaStop activado (2005–2013)","sig":"Hay agua en la bandeja inferior o la manguera de seguridad ha saltado: fuga interna.","pasos":["Cerrar el grifo del agua","Mirar si hay fugas visibles bajo la lavadora; no inclinarla"],"sem":"ambar","llamar":"Siempre: hay una fuga interna que localizar."},{"id":"f01-lavasecadora","cod":"F01","ap":"lavasecadora","keys":["F01","F1"],"titulo":"Placa electrónica o circuito del motor","sig":"Funciones no seleccionables o tambor que no gira: placa de control o circuito del motor.","pasos":["Desenchufar 2 minutos, enchufar, esperar 30 segundos y reintentar"],"sem":"ambar","llamar":"Si repite tras el reinicio: placa o motor."},{"id":"f02-lavasecadora","cod":"F02","ap":"lavasecadora","keys":["F02","F2"],"titulo":"Circuito del motor","sig":"El tambor gira a tirones o no gira: tacómetro o escobillas del motor.","pasos":["Desenchufar 2 minutos y reintentar una sola vez"],"sem":"ambar","llamar":"Siempre: escobillas o motor."},{"id":"f03-lavasecadora","cod":"F03","ap":"lavasecadora","keys":["F03","F3"],"titulo":"Sonda de temperatura del lavado (NTC)","sig":"La sonda de temperatura del agua falla: no calienta en el lavado.","pasos":[],"sem":"ambar","llamar":"Siempre."},{"id":"f05-lavasecadora","cod":"F05","ap":"lavasecadora","keys":["F05","F5"],"titulo":"No desagua","sig":"Bomba o tubo de desagüe obstruido: la puerta no abre o queda agua en el tambor.","pasos":["Vaciar y limpiar el filtro de la bomba (abajo a la derecha)","Revisar el tubo de desagüe sin dobleces y el sifón"],"sem":"verde","llamar":"Filtro limpio y sigue igual → bomba de desagüe."},{"id":"f06-lavasecadora","cod":"F06","ap":"lavasecadora","keys":["F06","F6"],"titulo":"Cierre de puerta","sig":"La puerta no abre, no cierra o la lavasecadora no arranca.","pasos":["Cerrar la puerta con firmeza y retirar ropa atrapada","Mirar si hay algo obstruyendo el gancho del cierre"],"sem":"verde","llamar":"Persiste con la puerta bien cerrada → blocapuertas."},{"id":"f07-lavasecadora","cod":"F07","ap":"lavasecadora","keys":["F07","F7"],"titulo":"Placa: circuito de calentamiento","sig":"Se para a mitad, no calienta o la bomba funciona en continuo: circuito de calentamiento en la placa.","pasos":[],"sem":"ambar","llamar":"Siempre."},{"id":"f08-lavasecadora","cod":"F08","ap":"lavasecadora","keys":["F08","F8"],"titulo":"Resistencia de lavado","sig":"El programa se para a mitad: resistencia de calentamiento del agua.","pasos":[],"sem":"ambar","llamar":"Siempre."},{"id":"f09-lavasecadora","cod":"F09","ap":"lavasecadora","keys":["F09","F9"],"titulo":"Fallo de software","sig":"Varias luces parpadean y no acepta programa.","pasos":["Desenchufar 2 minutos y reintentar"],"sem":"ambar","llamar":"Persiste: reprogramar o cambiar la placa."},{"id":"f11-lavasecadora","cod":"F11","ap":"lavasecadora","keys":["F11"],"titulo":"Circuito de la bomba","sig":"No evacúa el agua aunque el filtro esté limpio.","pasos":["Desenchufar 2 minutos y reintentar","Limpiar el filtro de la bomba por si es un F05 encubierto"],"sem":"ambar","llamar":"Siempre si repite."},{"id":"f12-lavasecadora","cod":"F12","ap":"lavasecadora","keys":["F12"],"titulo":"Control electrónico: no enciende","sig":"Fallo de comunicación entre la placa de control y el display.","pasos":["Desenchufar 2 minutos y reintentar"],"sem":"ambar","llamar":"Persiste tras el reinicio."},{"id":"f13-lavasecadora","cod":"F13","ap":"lavasecadora","keys":["F13"],"titulo":"Sonda de temperatura del secado","sig":"Solo lavasecadora: la sonda que controla la temperatura del ciclo de secado falla; lava bien pero no seca.","pasos":[],"sem":"ambar","llamar":"Siempre."},{"id":"f15-lavasecadora","cod":"F15","ap":"lavasecadora","keys":["F15"],"titulo":"Control de la resistencia de secado","sig":"Solo lavasecadora: fallo en el control de la resistencia de secado, a veces por sobrecarga.","pasos":["Comprobar que no está sobrecargada para el secado (la mitad de la carga de lavado)"],"sem":"ambar","llamar":"Siempre si repite con media carga."},{"id":"f18-lavasecadora","cod":"F18","ap":"lavasecadora","keys":["F18"],"titulo":"Error interno de datos","sig":"Display o funciones muertas por un error interno de la placa.","pasos":["Desenchufar 2 minutos y reintentar"],"sem":"ambar","llamar":"Persiste tras el reinicio."},{"id":"f19-lavasecadora","cod":"F19","ap":"lavasecadora","keys":["F19"],"titulo":"Ventilador o calor de secado","sig":"Solo lavasecadora: el ventilador o el circuito de calor del secado no funcionan; la ropa sale mojada.","pasos":[],"sem":"ambar","llamar":"Siempre."},{"id":"h2o-lavasecadora","cod":"H2O","ap":"lavasecadora","keys":["H2O","H20"],"titulo":"No entra agua","sig":"No llega agua en el tiempo previsto.","pasos":["Grifo abierto y manguera sin dobleces","Limpiar el filtro de la entrada de agua","Comprobar que hay presión en el grifo"],"sem":"verde","llamar":"Con agua y presión, y sigue igual → electroválvula."},{"id":"f6-lavavajillas","cod":"F6 / H2O / F6 E1 · F06","ap":"lavavajillas","keys":["F6","F06","H2O","H20","F6E1","F6E7","E1"],"titulo":"No entra agua","sig":"No llega agua o llega con poca presión. Con display Whirlpool se muestra F6, H2O o F6 E1; en la plataforma compartida con Indesit y Hotpoint (integrables por LEDs), F06 es el tiempo de llenado agotado.","pasos":["Grifo abierto y manguera sin dobleces","Limpiar el filtro de la entrada de agua","Comprobar que no hay espuma en la cuba (exceso de detergente)"],"sem":"verde","llamar":"Con agua y presión, y sigue igual → electroválvula."},{"id":"f2-lavavajillas","cod":"F2 / E4 · F01","ap":"lavavajillas","keys":["F2","F01","E4"],"titulo":"Agua en la base (antiinundación)","sig":"El flotador de la base ha detectado agua: fuga en manguera, puerta o junta. Con display Whirlpool es F2 (o E4); en la plataforma compartida, F01. Ojo: F02 en integrables es la electroválvula de llenado.","pasos":["Inclinar el lavavajillas 45° hacia atrás sobre una toalla para vaciar la base","Mirar manguera, puerta y junta por si hay una fuga visible"],"sem":"ambar","llamar":"Si reaparece tras vaciar la base: fuga interna."},{"id":"f02-lavavajillas","cod":"F02","ap":"lavavajillas","keys":["F02"],"titulo":"Electroválvula de llenado (plataforma compartida)","sig":"En los lavavajillas de la plataforma Indesit/Hotpoint (integrables por LEDs), F02 es la electroválvula de entrada de agua. No confundir con F2 de una cifra (agua en la base).","pasos":["Grifo abierto, presión suficiente y manguera sin dobleces"],"sem":"ambar","llamar":"Con agua y presión, y sigue igual → electroválvula."},{"id":"f4-lavavajillas","cod":"F4 / F8 E1 · F03","ap":"lavavajillas","keys":["F4","F03","F8E1"],"titulo":"No desagua","sig":"El agua no se va o se va muy despacio. Con display Whirlpool, F4 o F8 E1; en la plataforma compartida, F03 (tiempo de desagüe agotado).","pasos":["Limpiar el filtro del fondo de la cuba","Retirar restos de los brazos y del sumidero","Revisar el sifón y la manguera de desagüe sin dobleces"],"sem":"verde","llamar":"Filtro y manguera limpios, y sigue igual → bomba de desagüe."},{"id":"f3-lavavajillas","cod":"F3 / E3 · F10","ap":"lavavajillas","keys":["F3","E3","F10"],"titulo":"Calentador: no calienta ni seca","sig":"La resistencia no calienta el agua: la vajilla sale fría y mojada. Con display Whirlpool, F3 (o E3); en la plataforma compartida, F10.","pasos":[],"sem":"ambar","llamar":"Siempre."},{"id":"f1-lavavajillas","cod":"F1 / E6 · F04","ap":"lavavajillas","keys":["F1","E6","E7","F04"],"titulo":"Sonda de temperatura (NTC)","sig":"El termistor que mide la temperatura del agua está abierto o falla. Con display Whirlpool, F1 (o E6/E7); en la plataforma compartida, F04 (termostato).","pasos":[],"sem":"ambar","llamar":"Siempre."},{"id":"f5-lavavajillas","cod":"F5","ap":"lavavajillas","keys":["F5"],"titulo":"Rotor de motobomba o brazo bloqueado","sig":"Algo bloquea el brazo de lavado o el rotor de la motobomba: cristal, hueso, hueso de aceituna.","pasos":["Retirar cristal o restos de los brazos y del filtro","Girar los brazos a mano y comprobar que no rozan con nada"],"sem":"verde","llamar":"Persiste con los brazos libres."},{"id":"f7-lavavajillas","cod":"F7 / F6 E4 · F07","ap":"lavavajillas","keys":["F7","F6E4","F07"],"titulo":"Caudalímetro (turbina de agua)","sig":"La turbina que mide el agua que entra no gira o está dañada. Con display Whirlpool, F7 o F6 E4; en la plataforma compartida, F07.","pasos":["Abrir del todo el grifo del agua"],"sem":"ambar","llamar":"Persiste con el grifo bien abierto."},{"id":"f8-lavavajillas","cod":"F8 · F08","ap":"lavavajillas","keys":["F8","F08"],"titulo":"Nivel de agua alto · tiempo de temperatura","sig":"Con display Whirlpool, F8 es nivel de agua demasiado alto (filtro o sensor). En la plataforma compartida, F08 es que no alcanza la temperatura a tiempo.","pasos":["Limpiar el filtro del fondo de la cuba"],"sem":"ambar","llamar":"Siempre si repite."},{"id":"f9-lavavajillas","cod":"F9 · F09","ap":"lavavajillas","keys":["F9","F09"],"titulo":"Entrada continua de agua · software","sig":"Con display Whirlpool, F9 es entrada de agua continua (electroválvula o placa). En la plataforma compartida, F09 es un fallo de software.","pasos":["Con F9, cerrar el grifo del agua","Con F09, desenchufar 2 minutos y reintentar"],"sem":"ambar","llamar":"Siempre con F9; con F09, si persiste tras el reinicio."},{"id":"f11-lavavajillas","cod":"F11","ap":"lavavajillas","keys":["F11"],"titulo":"Motobomba de lavado (plataforma compartida)","sig":"La bomba que impulsa el agua a los brazos falla o está bloqueada (integrables y W Collection).","pasos":["Retirar obstrucciones de los brazos y del filtro"],"sem":"ambar","llamar":"Siempre."},{"id":"f12-lavavajillas","cod":"F12 / F13 / F15","ap":"lavavajillas","keys":["F12","F13","F15"],"titulo":"Electrónica: display, placa principal, sensor","sig":"Plataforma compartida: F12 comunicación placa–display, F13 placa principal, F15 el sensor virtual de la placa.","pasos":["Desenchufar 2 minutos y reintentar"],"sem":"ambar","llamar":"Persiste tras el reinicio."},{"id":"fa-lavavajillas","cod":"FA / FB / FC","ap":"lavavajillas","keys":["FA","FB","FC"],"titulo":"Sensor de turbidez, válvula distribuidora, dureza","sig":"Con display Whirlpool: FA sensor óptico de turbidez (6TH SENSE), FB válvula distribuidora de agua, FC sensor de dureza.","pasos":[],"sem":"ambar","llamar":"Siempre."},{"id":"e1-frigorifico","cod":"E1","ap":"frigorifico","keys":["E1","E01"],"titulo":"Sonda del frigorífico","sig":"El sensor de temperatura del compartimento frigorífico falla: enfría mal o demasiado.","pasos":["Desenchufar 5 minutos y volver a enchufar"],"sem":"ambar","llamar":"Persiste tras el reinicio."},{"id":"e2-frigorifico","cod":"E2","ap":"frigorifico","keys":["E2","E02"],"titulo":"Sonda del congelador","sig":"El sensor de temperatura del congelador falla.","pasos":["Desenchufar 5 minutos y volver a enchufar"],"sem":"ambar","llamar":"Persiste tras el reinicio."},{"id":"e3-frigorifico","cod":"E3","ap":"frigorifico","keys":["E3","E03"],"titulo":"Desescarche: temperatura incorrecta","sig":"La sonda de desescarche detecta una temperatura incorrecta en el frigorífico; suele ir con escarcha o goteo.","pasos":["Comprobar que el desagüe de desescarche (fondo del frigorífico) no tiene hielo ni restos"],"sem":"ambar","llamar":"Persiste con el desagüe limpio."},{"id":"e4-frigorifico","cod":"E4 / E5","ap":"frigorifico","keys":["E4","E5","E04","E05"],"titulo":"Sonda de desescarche (frigorífico · congelador)","sig":"E4: sonda de desescarche del frigorífico. E5: sonda de desescarche del congelador. Sin ellas, el No Frost hace escarcha.","pasos":[],"sem":"ambar","llamar":"Siempre."},{"id":"e6-frigorifico","cod":"E6","ap":"frigorifico","keys":["E6","E06"],"titulo":"Placa principal o display","sig":"Fallo de la placa principal o de la comunicación con el panel: display muerto o sin respuesta.","pasos":["Desenchufar 5 minutos y volver a enchufar"],"sem":"ambar","llamar":"Persiste tras el reinicio."},{"id":"e7-frigorifico","cod":"E7 / E8","ap":"frigorifico","keys":["E7","E8","E07","E08"],"titulo":"Sonda de temperatura ambiente","sig":"El sensor que mide la temperatura de la cocina falla; el frigorífico regula mal.","pasos":[],"sem":"ambar","llamar":"Siempre."},{"id":"e9-frigorifico","cod":"E9","ap":"frigorifico","keys":["E9","E09"],"titulo":"Alarma de temperatura alta en el congelador","sig":"El congelador ha subido de temperatura: puerta abierta, carga reciente de alimentos o corte de luz.","pasos":["Comprobar que la puerta cierra bien y nada la bloquea","Si acabas de cargarlo, darle un día para que recupere temperatura","Pulsar Reset alarm para silenciarla una vez comprobado"],"sem":"verde","llamar":"Vuelve a saltar con la puerta cerrada y sin carga reciente."},{"id":"e0-frigorifico","cod":"E0 / EE","ap":"frigorifico","keys":["E0","E00","EE"],"titulo":"Fabricador de hielo (americanos)","sig":"Fallo del fabricador de hielo o de su circuito en los side-by-side y multipuerta.","pasos":["Comprobar que el grifo de la toma de agua está abierto"],"sem":"ambar","llamar":"Persiste con la toma abierta."},{"id":"af-frigorifico","cod":"AF","ap":"frigorifico","keys":["AF","FILTRO"],"titulo":"Filtro antibacteriano agotado","sig":"Aviso, no avería: el filtro antibacteriano ha llegado al final de su vida útil.","pasos":["Cambiar el filtro antibacteriano y resetear el aviso según el manual"],"sem":"verde","llamar":"Si el aviso no desaparece con el filtro nuevo.","aviso":1},{"id":"cl-frigorifico","cod":"CL / LO","ap":"frigorifico","keys":["CL","LO","BLOQUEO"],"titulo":"Bloqueo de teclas","sig":"Aviso, no avería: el panel está bloqueado y no responde a las teclas.","pasos":["Mantener pulsado Reset alarm unos 3 segundos para desbloquear"],"sem":"verde","llamar":"Si sigue sin responder tras desbloquear.","aviso":1},{"id":"e2-congelador","cod":"E2","ap":"congelador","keys":["E2","E02"],"titulo":"Sonda del congelador","sig":"El sensor de temperatura del congelador falla: no congela o congela de más.","pasos":["Desenchufar 5 minutos y volver a enchufar"],"sem":"ambar","llamar":"Persiste tras el reinicio."},{"id":"e5-congelador","cod":"E5","ap":"congelador","keys":["E5","E05"],"titulo":"Sonda de desescarche","sig":"La sonda de desescarche del congelador falla; el No Frost acaba haciendo escarcha.","pasos":[],"sem":"ambar","llamar":"Siempre."},{"id":"e6-congelador","cod":"E6","ap":"congelador","keys":["E6","E06"],"titulo":"Placa principal o display","sig":"Fallo de la placa principal o de la comunicación con el panel.","pasos":["Desenchufar 5 minutos y volver a enchufar"],"sem":"ambar","llamar":"Persiste tras el reinicio."},{"id":"e9-congelador","cod":"E9","ap":"congelador","keys":["E9","E09","ALARMA","PITA"],"titulo":"Alarma de temperatura alta","sig":"El congelador ha subido de temperatura: puerta abierta, carga reciente o corte de luz.","pasos":["Comprobar que la puerta cierra bien y nada la bloquea","Si acabas de cargarlo, darle un día para que recupere temperatura","Pulsar Reset alarm para silenciarla una vez comprobado"],"sem":"verde","llamar":"Vuelve a saltar con la puerta cerrada y sin carga reciente."},{"id":"f01-secadora","cod":"F01","ap":"secadora","keys":["F01","F1"],"titulo":"Placa electrónica","sig":"No se pueden seleccionar funciones: placa de control.","pasos":["Desenchufar 2 minutos, enchufar, esperar 30 segundos y reintentar"],"sem":"ambar","llamar":"Persiste tras el reinicio."},{"id":"f02-secadora","cod":"F02","ap":"secadora","keys":["F02","F2"],"titulo":"Circuito del motor: tambor no gira","sig":"El tambor no gira o gira a tirones: correa, motor o su circuito.","pasos":[],"sem":"ambar","llamar":"Siempre (correa o motor)."},{"id":"f03-secadora","cod":"F03","ap":"secadora","keys":["F03","F3"],"titulo":"Sonda de temperatura: no calienta","sig":"La sonda de temperatura falla o la secadora se ha sobrecalentado por falta de limpieza.","pasos":["Limpiar el filtro de pelusa y el condensador (o el filtro inferior en bomba de calor)"],"sem":"ambar","llamar":"Persiste con los filtros limpios."},{"id":"f05-secadora","cod":"F05","ap":"secadora","keys":["F05","F5","DEPOSITO"],"titulo":"Bomba de condensados (depósito lleno)","sig":"Marca depósito lleno con poca ropa: bomba de condensados o tubo obstruido.","pasos":["Vaciar el depósito de agua","Limpiar el filtro inferior y el flotador de la bandeja"],"sem":"verde","llamar":"Depósito vacío, filtro limpio y sigue igual → bomba de condensados."},{"id":"f06-secadora","cod":"F06","ap":"secadora","keys":["F06","F6"],"titulo":"Cierre de puerta","sig":"La secadora no arranca porque no detecta la puerta cerrada.","pasos":["Cerrar la puerta con firmeza","Mirar si hay pelusa o algo obstruyendo el gancho"],"sem":"verde","llamar":"Persiste con la puerta bien cerrada → cierre o microinterruptor."},{"id":"f07-secadora","cod":"F07 / F08 / F15","ap":"secadora","keys":["F07","F7","F08","F8","F15"],"titulo":"Resistencia o circuito de calor","sig":"F08 resistencia, F07 su circuito en la placa, F15 el control de calor: la secadora gira pero no calienta.","pasos":["Limpiar filtros y condensador por si el sobrecalentamiento ha disparado la protección"],"sem":"ambar","llamar":"Siempre."},{"id":"f12-secadora","cod":"F12","ap":"secadora","keys":["F12"],"titulo":"Control electrónico: no enciende","sig":"Fallo de comunicación entre la placa y el panel: no enciende o no responde.","pasos":["Desenchufar 2 minutos y reintentar"],"sem":"ambar","llamar":"Persiste tras el reinicio."},{"id":"f16-secadora","cod":"F16 / F18","ap":"secadora","keys":["F16","F18"],"titulo":"Sensor de posición del tambor · error de datos","sig":"F16: sensor de posición del tambor. F18: error interno de datos de la placa.","pasos":["Desenchufar 2 minutos y reintentar"],"sem":"ambar","llamar":"Persiste tras el reinicio."}];
var APARATOS={"lavadora":{"id":"lavadora","nombre":"Lavadora","art":"una lavadora","slug":"lavadora"},"lavavajillas":{"id":"lavavajillas","nombre":"Lavavajillas","art":"un lavavajillas","slug":"lavavajillas"},"frigorifico":{"id":"frigorifico","nombre":"Frigorífico","art":"un frigorífico","slug":"frigorifico"},"secadora":{"id":"secadora","nombre":"Secadora","art":"una secadora","slug":"secadora"},"lavasecadora":{"id":"lavasecadora","nombre":"Lavasecadora","art":"una lavasecadora","slug":"lavasecadora"},"congelador":{"id":"congelador","nombre":"Congelador","art":"un congelador","slug":"congelador"},"horno":{"id":"horno","nombre":"Horno","art":"un horno","slug":"horno"},"placa":{"id":"placa","nombre":"Placa de inducción","art":"una placa","slug":"placa"},"campana":{"id":"campana","nombre":"Campana extractora","art":"una campana","slug":"campana"},"aire-acondicionado":{"id":"aire-acondicionado","nombre":"Aire acondicionado","art":"un aire acondicionado","slug":"aire-acondicionado"}};
  var REL = document.documentElement.getAttribute('data-rel') || '';
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var wa = function (t) { return CONFIG.WA_BASE + encodeURIComponent(t); };
  var ico = function (id, cls) { return '<svg class="' + (cls || '') + '" aria-hidden="true"><use href="#i-' + id + '"/></svg>'; };
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- zona (memoria de sesión) */
  var Z = {
    get: function () { try { return sessionStorage.getItem('zona') || ''; } catch (e) { return ''; } },
    set: function (v) { try { v ? sessionStorage.setItem('zona', v) : sessionStorage.removeItem('zona'); } catch (e) { } }
  };
  if (document.body.getAttribute('data-zona')) Z.set(document.body.getAttribute('data-zona'));
  var zonaTxt = function () { return Z.get() || '[tu barrio o municipio]'; };

  /* ---------- horario */
  function abierto() {
    var d = new Date(), h = d.getHours() + d.getMinutes() / 60, w = d.getDay();
    if (w >= 1 && w <= 5) return h >= 8 && h < 20;
    if (w === 6) return h >= 9 && h < 14;
    return false;
  }
  if (!abierto()) $$('[data-chip-hora]').forEach(function (el) { el.textContent = 'Te llamamos a primera hora (L–V desde las 8)'; });

  /* ---------- barra inferior: solo cuando los CTA del hero no se ven */
  var barra = $('.barra');
  if (barra) {
    var heroCta = $('[data-hero-cta]');
    var setBarra = function (on) { barra.classList.toggle('on', on); document.body.classList.toggle('barra-on', on); };
    if (heroCta && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (es) { setBarra(!es[0].isIntersecting && es[0].boundingClientRect.top < 0 || (!es[0].isIntersecting && window.scrollY > 300)); }, { threshold: 0.2 }).observe(heroCta);
    } else setBarra(true);
  }

  /* ---------- modal de llamada en escritorio */
  var esEscritorio = window.matchMedia('(hover:hover) and (pointer:fine)').matches && window.innerWidth >= 1024;
  var modal = $('#modal-tel');
  if (modal && esEscritorio) {
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[href^="tel:"]');
      if (!a) return;
      e.preventDefault(); modal.classList.add('on'); $('.cerrar', modal).focus();
    });
    $('.cerrar', modal).addEventListener('click', function () { modal.classList.remove('on'); });
    modal.addEventListener('click', function (e) { if (e.target === modal) modal.classList.remove('on'); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') modal.classList.remove('on'); });
    var cp = $('[data-copiar]', modal);
    if (cp) cp.addEventListener('click', function () {
      if (navigator.clipboard) navigator.clipboard.writeText('641153922').then(function () { cp.textContent = 'Copiado: 641 153 922'; });
    });
  }

  /* ---------- vídeo del hero: solo 4G, en viewport, sin reduced-motion ni ahorro de datos */
  var v = $('video[data-src]');
  if (v) {
    var c = navigator.connection || {};
    var okRed = !c.saveData && (!c.effectiveType || c.effectiveType === '4g');
    if (window.innerWidth < 900 && v.getAttribute('data-src-m')) v.setAttribute('data-src', v.getAttribute('data-src-m'));
    if (okRed && !reduced && 'IntersectionObserver' in window) {
      var cargado = false;
      new IntersectionObserver(function (es) {
        if (es[0].isIntersecting) {
          if (!cargado) { cargado = true; v.src = v.getAttribute('data-src'); v.load(); v.addEventListener('playing', function () { v.classList.add('on'); }, { once: true }); }
          v.play().catch(function () { });
        } else if (cargado) v.pause();
      }, { threshold: 0.1 }).observe(v);
    }
  }

  /* ---------- reveals */
  if ('IntersectionObserver' in window && !reduced) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { rootMargin: '0px 0px -8% 0px' });
    $$('.rv').forEach(function (el) { io.observe(el); });
  } else $$('.rv').forEach(function (el) { el.classList.add('in'); });

  /* ---------- síntomas (subpáginas) */
  $$('.sint-b').forEach(function (b) {
    b.addEventListener('click', function () {
      var p = b.nextElementSibling, on = b.getAttribute('aria-expanded') === 'true';
      $$('.sint-b', b.closest('.sint')).forEach(function (o) { o.setAttribute('aria-expanded', 'false'); o.nextElementSibling.classList.remove('on'); });
      if (!on) { b.setAttribute('aria-expanded', 'true'); p.classList.add('on'); }
    });
  });
  /* WhatsApp con zona en enlaces marcados */
  $$('a[data-wa]').forEach(function (a) {
    a.addEventListener('click', function () { a.href = wa(a.getAttribute('data-wa').replace('[zona]', zonaTxt())); });
    a.href = wa(a.getAttribute('data-wa').replace('[zona]', zonaTxt()));
  });

  /* ================================================================ BUSCADOR */
  var APW = { lavasecadora: ['LAVASECADORA', 'LAVASECADORAS'], lavadora: ['LAVADORA', 'LAVADORAS'], lavavajillas: ['LAVAVAJILLAS', 'LAVAPLATOS'], congelador: ['CONGELADOR', 'CONGELADORES', 'ARCON'], frigorifico: ['FRIGORIFICO', 'FRIGO', 'NEVERA', 'COMBI', 'AMERICANO', 'FRIGORIFICOS'], secadora: ['SECADORA', 'SECADORAS'], horno: ['HORNO', 'HORNOS'], campana: ['CAMPANA', 'EXTRACTORA'], caldera: ['CALDERA', 'CONDENS', 'CALEFACCION'], calentador: ['CALENTADOR', 'TERMO', 'THERM'], 'aire-acondicionado': ['AIRE', 'ACONDICIONADO', 'SPLIT', 'CLIMA', 'CLIMATIZACION', 'CLIMATE'], placa: ['PLACA', 'INDUCCION', 'VITRO', 'VITROCERAMICA', 'ENCIMERA'] };
  function sinAcentos(s) { return s.normalize ? s.normalize('NFD').replace(/[̀-ͯ]/g, '') : s; }
  function parse(q) {
    var up = sinAcentos(q).toUpperCase(), ap = null;
    Object.keys(APW).forEach(function (k) { APW[k].forEach(function (w) { var re = new RegExp('\\b' + w + '\\b'); if (re.test(up)) { ap = ap || k; up = up.replace(re, ' '); } }); });
    var sinRelleno = up.replace(/\b(ERROR|CODIGO|CODE|DE|MI|LA|EL|MARCA|UN|UNA)\b/g, ' ');
    if (sinRelleno.trim()) up = sinRelleno; /* si la consulta es solo «dE» (código de puerta en LG), no se vacía */
    if (CONFIG.MARCA_RE) up = up.replace(CONFIG.MARCA_RE, ' ');
    var k = up.replace(/[\s\-\._:\/]/g, '');
    k = k.replace(/^O(?=\d)/, 'E').replace(/O(?=\d)/g, '0').replace(/(\d)O/g, '$10');
    if (/^\d+$/.test(k)) k = 'E' + k;
    var alt = CONFIG.F_ES_E && /^F\d/.test(k) ? k.replace(/^F/, 'E') : null;
    return { key: k, alt: alt, ap: ap, fIn: !!alt };
  }
  function buscar1(key, ap, prefijo) {
    return CODIGOS.filter(function (c) {
      if (ap && c.ap !== ap) return false;
      return c.keys.some(function (k) { return prefijo ? k.indexOf(key) === 0 : k === key; });
    });
  }
  function buscar(key, ap, prefijo, alt) {
    var r = buscar1(key, ap, prefijo);
    if (!r.length && alt) r = buscar1(alt, ap, prefijo);
    return r;
  }
  function semTxt(c) { return c.sem === 'verde' ? 'Puedes comprobarlo tú en 2 minutos' : 'Mejor llamar directamente'; }
  function textoWA(c, pasos) {
    var a = APARATOS[c.ap], codigo = c.cod.split('/')[0].trim();
    var t = 'Hola, tengo ' + a.art + ' ' + CONFIG.MARCA + ' que marca ' + codigo + '. ';
    if (pasos && pasos.length) t += 'He probado: ' + pasos.join(', ').toLowerCase() + ' y sigue igual. ';
    return t + 'Estoy en ' + zonaTxt();
  }
  function renderFicha(c, opts) {
    opts = opts || {};
    var a = APARATOS[c.ap], codigo = c.cod.split('/')[0].trim();
    var h = '<article class="ficha' + (c.sem === 'ambar' ? ' hot' : '') + '" data-id="' + c.id + '">';
    h += '<div class="ficha-h"><span class="ficha-cod">' + esc(c.cod) + '</span><span class="ficha-ap">' + ico(a.id) + esc(a.nombre) + ' <span class="marca">' + esc(CONFIG.MARCA) + '</span></span></div>';
    h += '<p class="ficha-t">' + esc(c.titulo) + '</p><p class="ficha-s">' + esc(c.sig) + '</p>';
    h += '<span class="sem sem-' + c.sem + '">' + semTxt(c) + '</span>';
    if (c.pasos.length) {
      h += '<ul class="chk" aria-label="Autocomprobación">' + c.pasos.map(function (p, i) { return '<li><label><input type="checkbox" data-paso="' + i + '"><span>' + esc(p) + '</span></label></li>'; }).join('') + '</ul>';
      h += '<div class="sigue" role="group" aria-label="Resultado"><p>¿Sigue marcando ' + esc(codigo) + '?</p><div class="g"><button type="button" class="si">Sí, sigue igual</button><button type="button" class="no">Se ha arreglado</button></div></div>';
    }
    h += '<div class="llamar-c' + (c.pasos.length ? '' : ' on') + '"><b>Cuándo llamar</b>' + esc(c.llamar) + '</div>';
    h += '<div class="ok-c">Nos alegramos. Si vuelve a marcarlo, aquí estamos. <a class="link" href="' + REL + a.slug + '/">Cómo cuidar tu ' + esc(a.nombre.toLowerCase()) + ' →</a></div>';
    h += '<div class="ficha-cta"><a class="btn btn-wa" data-cta-wa href="' + wa(textoWA(c, [])) + '" target="_blank" rel="noopener">' + ico('wa') + 'WhatsApp con el código</a>';
    h += '<a class="btn btn-amber" data-cta-tel href="' + CONFIG.TEL_HREF + '">' + ico('tel') + 'Llamar · ' + CONFIG.TEL + '</a></div>';
    h += '<div class="ficha-links"><a class="link" href="' + REL + a.slug + '/">Ver todo sobre ' + esc(a.art) + ' ' + esc(CONFIG.MARCA) + ' →</a><button type="button" data-copy="' + c.id + '">Copiar enlace a este código</button></div>';
    h += '<p class="ficha-fin">Presupuesto por escrito en casa antes de tocar nada. Si tu aparato tiene menos de 3 años, tiene garantía legal del fabricante: ' + CONFIG.SAT_TXT + '</p>';
    return h + '</article>';
  }
  function bindFicha(el) {
    var id = el.getAttribute('data-id'), c = CODIGOS.filter(function (x) { return x.id === id; })[0];
    if (!c || el.__b) return; el.__b = true;
    var chk = $$('input[type=checkbox]', el), sigue = $('.sigue', el), llamar = $('.llamar-c', el), ok = $('.ok-c', el);
    var bWa = $('[data-cta-wa]', el), bTel = $('[data-cta-tel]', el);
    var codigo = c.cod.split('/')[0].trim();
    var pasos = function () { return chk.filter(function (i) { return i.checked; }).map(function (i) { return i.nextElementSibling.textContent; }); };
    var refresca = function () { bWa.href = wa(textoWA(c, pasos())); };
    chk.forEach(function (i) {
      i.addEventListener('change', function () {
        refresca();
        if (chk.every(function (x) { return x.checked; })) { sigue.classList.add('on'); } else { sigue.classList.remove('on'); }
      });
    });
    if (sigue) {
      $('.si', sigue).addEventListener('click', function () {
        llamar.classList.add('on'); ok.classList.remove('on'); el.classList.add('hot'); refresca();
        bTel.innerHTML = ico('tel') + 'Que me llame un técnico · 60,50 € IVA incl., se descuenta';
        bTel.setAttribute('href', '#contacto'); bTel.removeAttribute('data-cta-tel');
        bTel.addEventListener('click', function (e) { e.preventDefault(); prefill(c.ap, codigo); });
        $('.si', sigue).setAttribute('aria-pressed', 'true'); $('.no', sigue).removeAttribute('aria-pressed');
      });
      $('.no', sigue).addEventListener('click', function () {
        ok.classList.add('on'); llamar.classList.remove('on'); el.classList.remove('hot');
        $('.no', sigue).setAttribute('aria-pressed', 'true'); $('.si', sigue).removeAttribute('aria-pressed');
      });
    }
    var cp = $('[data-copy]', el);
    if (cp) cp.addEventListener('click', function () {
      var url = new URL(REL + 'codigos-error/#' + c.id, location.href).href;
      var done = function () { cp.textContent = 'Enlace copiado'; setTimeout(function () { cp.textContent = 'Copiar enlace a este código'; }, 2500); };
      if (navigator.clipboard) navigator.clipboard.writeText(url).then(done, function () { prompt('Copia el enlace:', url); });
      else prompt('Copia el enlace:', url);
    });
    refresca();
  }
  $$('.ficha[data-id]').forEach(bindFicha);

  function initBus(root) {
    var input = $('input', root), sug = $('.bus-sug', root), res = $('.bus-res', root), x = $('.bus-x', root);
    var apFijo = root.getAttribute('data-ap') || null, ap = apFijo, sel = -1, items = [];
    var chips = $$('.chip-btn[data-ap]', root);
    /* atajos «más buscados»: al elegir un aparato solo se ofrecen SUS códigos (nunca los de otro aparato) */
    var top = $('.bus-top', root), topHTML = top ? top.innerHTML : '';
    function bindAtajos() {
      $$('[data-cod]', root).forEach(function (b) { if (b._ok) return; b._ok = 1; b.addEventListener('click', function () { var c = CODIGOS.filter(function (y) { return y.id === b.getAttribute('data-cod'); })[0]; if (!c) return; if (ap && c.ap !== ap) { setAp(c.ap); } input.value = c.cod.split('/')[0]; muestra(c); }); });
    }
    function pintaAtajos(k) {
      if (!top || apFijo) return;
      /* defensa: cualquier atajo de código que haya quedado fuera de .bus-top se elimina al elegir aparato */
      $$('[data-cod]', root).forEach(function (b) { if (!b.closest('.bus-top') && !b.closest('.bus-res')) { var li = b.closest('li'); (li || b).remove(); } });
      if (!k) { top.innerHTML = topHTML; bindAtajos(); return; }
      var a = APARATOS[k], mios = CODIGOS.filter(function (c) { return c.ap === k && !c.aviso; }).slice(0, 8), av = CODIGOS.filter(function (c) { return c.ap === k && c.aviso; });
      if (!mios.length && !av.length) { top.innerHTML = '<span class="bus-top-nota">' + esc(a.nombre) + ': sin códigos verificados de ' + esc(CONFIG.MARCA) + '. Dinos el síntoma y te decimos qué puede ser.</span>'; return; }
      top.innerHTML = 'Códigos de ' + esc(a.nombre.toLowerCase()) + ': <ul class="chips">' + mios.concat(av).map(function (c) { return '<li><button type="button" class="chip chip-btn" data-cod="' + c.id + '">' + esc(c.cod.split('/')[0]) + '</button></li>'; }).join('') + '</ul>';
      bindAtajos();
    }
    var setAp = function (k) {
      ap = k; chips.forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-ap') === k ? 'true' : 'false'); });
      pintaAtajos(k);
      /* al cambiar de aparato se empieza de cero: el código anterior no se arrastra */
      input.value = ''; x.classList.remove('on'); limpia(); if (res) res.innerHTML = '';
    };
    chips.forEach(function (b) { b.addEventListener('click', function () { setAp(ap === b.getAttribute('data-ap') ? null : b.getAttribute('data-ap')); if (b.getAttribute('data-ap') === 'placa' && placaSinCodigos()) placa(); }); });
    bindAtajos();
    function limpia() { sug.classList.remove('on'); sug.innerHTML = ''; sel = -1; items = []; input.setAttribute('aria-expanded', 'false'); }
    function muestra(c) {
      if (ap && c.ap !== ap && !apFijo) { ap = c.ap; chips.forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-ap') === c.ap ? 'true' : 'false'); }); pintaAtajos(c.ap); }
      limpia(); res.innerHTML = renderFicha(c); bindFicha($('.ficha', res));
      if (!reduced && root.getAttribute('data-scroll') !== 'no') setTimeout(function () { res.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }, 50);
    }
    function ambiguo(list, key) {
      res.innerHTML = '<div class="bus-amb"><p>' + esc(key) + ' existe en varios aparatos. ¿En cuál?</p><div class="g">' +
        list.map(function (c) { return '<button type="button" data-id="' + c.id + '">' + ico(c.ap) + esc(APARATOS[c.ap].nombre) + '</button>'; }).join('') + '</div></div>';
      $$('button', res).forEach(function (b) { b.addEventListener('click', function () { muestra(CODIGOS.filter(function (c) { return c.id === b.getAttribute('data-id'); })[0]); }); });
    }
    function nada(raw, key, apq, pre) {
      var a = apq ? APARATOS[apq] : null, art = a ? a.art : 'mi aparato';
      var quiza = (pre && pre.length) ? '<p>¿Querías decir…?</p><ul class="chips" style="margin-bottom:14px">' + pre.slice(0, 5).map(function (c) { return '<li><button type="button" class="chip chip-btn" data-id="' + c.id + '">' + ico(c.ap) + c.cod.split('/')[0] + ' · ' + esc(APARATOS[c.ap].nombre) + '</button></li>'; }).join('') + '</ul>' : '';
      var t = 'Hola, ' + (a ? 'tengo ' + art + ' ' + CONFIG.MARCA + ' que marca ' : 'mi aparato ' + CONFIG.MARCA + ' marca ') + key + '. ¿Me decís qué puede ser? Estoy en ' + zonaTxt();
      res.innerHTML = '<div class="bus-no"><p>No tenemos <strong class="mono">' + esc(key) + '</strong>' + (a ? ' en ' + esc(a.nombre.toLowerCase()) : '') + ' verificado con documentación de <span class="marca">' + esc(CONFIG.MARCA) + '</span> y preferimos no inventarlo. Escríbenoslo igual y te decimos qué puede ser.</p>' + quiza +
        '<a class="btn btn-wa" href="' + wa(t) + '" target="_blank" rel="noopener">' + ico('wa') + 'Preguntar por WhatsApp</a>' +
        '<p class="ficha-fin">Manda también una foto de la etiqueta ' + esc(CONFIG.ETIQUETA) + ' (en la puerta o el marco del aparato): así te contestamos con el modelo exacto. <a class="link" href="' + REL + 'codigos-error/#enr">Dónde está el ' + esc(CONFIG.ETIQUETA) + ' →</a></p></div>';
      $$('button[data-id]', res).forEach(function (b) { b.addEventListener('click', function () { var c = CODIGOS.filter(function (y) { return y.id === b.getAttribute('data-id'); })[0]; input.value = c.cod.split('/')[0]; muestra(c); }); });
    }
    /* la placa solo va «por síntomas» si la marca no publica códigos verificados para ella (Siemens sí los tiene) */
    function placaSinCodigos() { return !!APARATOS.placa && !CODIGOS.some(function (c) { return c.ap === 'placa'; }); }
    function placa() {
      limpia();
      var ss = ['no detecta la olla', 'parpadea', 'se apaga por temperatura'];
      res.innerHTML = '<div class="bus-no"><p>Las placas <span class="marca">' + esc(CONFIG.MARCA) + '</span> avisan por símbolos y parpadeos, no por códigos verificables: dinos el síntoma.</p><ul class="chips">' +
        ss.map(function (s) { return '<li><a class="chip chip-btn" target="_blank" rel="noopener" href="' + wa('Hola, tengo una placa ' + CONFIG.MARCA + ' que ' + s + '. Estoy en ' + zonaTxt()) + '">' + ico('wa') + esc(s) + '</a></li>'; }).join('') +
        '</ul><p class="ficha-fin mt16"><a class="link" href="' + REL + 'placa/">Placa de inducción: por síntomas, no por códigos →</a></p></div>';
    }
    function go(raw) {
      var p = parse(raw), apq = ap || p.ap;
      if (apq === 'placa' && placaSinCodigos()) { placa(); return; }
      if (!p.key && apq) { var av = CODIGOS.filter(function (c) { return c.ap === apq && c.aviso; }); if (av.length === 1) return muestra(av[0]); }
      if (!p.key) { res.innerHTML = ''; limpia(); return; }
      var ex = buscar(p.key, apq, false, p.alt);
      if (ex.length === 1) return muestra(ex[0]);
      if (ex.length > 1) { limpia(); return ambiguo(ex, p.key); }
      var pre = buscar(p.key, apq, true, p.alt);
      if (pre.length === 1 && p.key.length < 3) return muestra(pre[0]);
      limpia(); nada(raw, p.key, apq, pre);
    }
    function sugiere() {
      var raw = input.value, p = parse(raw), apq = ap || p.ap;
      x.classList.toggle('on', !!raw);
      if (!p.key || p.key.length < 2 || (apq === 'placa' && placaSinCodigos())) { limpia(); return; }
      var seen = {}, list = buscar(p.key, apq, true, p.alt).filter(function (c) { return !seen[c.id] && (seen[c.id] = 1); }).slice(0, 5);
      var ex = buscar(p.key, apq, false, p.alt); if (ex.length) list = ex.concat(list.filter(function (c) { return ex.indexOf(c) < 0; })).slice(0, 5);
      if (!list.length) { limpia(); return; }
      items = list; sel = -1;
      sug.innerHTML = list.map(function (c, i) {
        var k = c.keys.filter(function (y) { return y.indexOf(p.key) === 0 || (p.alt && y.indexOf(p.alt) === 0); })[0] || c.cod;
        var disp = c.cod; if (c.cod.indexOf(k) < 0 && c.cod.indexOf(k.replace(/^E/, 'F')) < 0) disp = k + ' (' + c.cod + ')';
        var m = disp.indexOf(p.key) >= 0 ? disp.replace(p.key, '<mark>' + p.key + '</mark>') : (p.alt ? disp.replace(p.alt, '<mark>' + p.alt + '</mark>') : disp);
        return '<li role="option" id="' + root.id + '-o' + i + '" data-id="' + c.id + '"><span class="mono">' + m + '</span><span class="ap">' + esc(APARATOS[c.ap].nombre) + '</span><span>' + esc(c.titulo) + '</span></li>';
      }).join('');
      if (p.fIn && !buscar1(p.key, apq, true).length) sug.innerHTML += '<li style="cursor:default;color:#55636F;font-size:12px">En ' + esc(CONFIG.MARCA) + ', F y E son el mismo código (F18 = E18)</li>';
      sug.classList.add('on'); input.setAttribute('aria-expanded', 'true');
      $$('li[data-id]', sug).forEach(function (li) { li.addEventListener('mousedown', function (e) { e.preventDefault(); input.value = li.querySelector('.mono').textContent.split(' ')[0]; muestra(CODIGOS.filter(function (c) { return c.id === li.getAttribute('data-id'); })[0]); }); });
    }
    input.addEventListener('input', sugiere);
    input.addEventListener('keydown', function (e) {
      var lis = $$('li[data-id]', sug);
      if (e.key === 'ArrowDown' && lis.length) { e.preventDefault(); sel = (sel + 1) % lis.length; }
      else if (e.key === 'ArrowUp' && lis.length) { e.preventDefault(); sel = (sel - 1 + lis.length) % lis.length; }
      else if (e.key === 'Enter') { e.preventDefault(); if (sel >= 0 && lis[sel]) { input.value = lis[sel].querySelector('.mono').textContent.split(' ')[0]; muestra(CODIGOS.filter(function (c) { return c.id === lis[sel].getAttribute('data-id'); })[0]); } else go(input.value); return; }
      else if (e.key === 'Escape') { limpia(); return; }
      else return;
      lis.forEach(function (li, i) { li.setAttribute('aria-selected', i === sel ? 'true' : 'false'); });
      input.setAttribute('aria-activedescendant', sel >= 0 ? lis[sel].id : '');
    });
    input.addEventListener('blur', function () { setTimeout(limpia, 150); });
    x.addEventListener('click', function () { input.value = ''; res.innerHTML = ''; limpia(); x.classList.remove('on'); input.focus(); });
    var f = $('form', root); if (f) f.addEventListener('submit', function (e) { e.preventDefault(); go(input.value); });
    root.__go = function (q) { input.value = q; go(q); };
  }
  $$('.bus').forEach(initBus);

  /* ---------- hub: abrir ancla y hacer scroll */
  function abreAncla() {
    var h = location.hash.replace('#', ''); if (!h) return;
    var d = document.getElementById(h);
    if (d && d.tagName === 'DETAILS') { d.open = true; setTimeout(function () { d.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' }); }, 60); }
  }
  abreAncla(); window.addEventListener('hashchange', abreAncla);

  /* ================================================================ FORMULARIO */
  var form = $('#form-llamada');
  function prefill(apId, codigo) {
    if (!form) return;
    if (apId) $$('[name=aparato]', form).forEach(function (r) { r.checked = r.value === APARATOS[apId].nombre; });
    if (codigo) { $('[name=codigo]', form).value = codigo; var s = $$('[name=sintoma]', form).filter(function (r) { return r.value === 'Error en pantalla'; })[0]; if (s) s.checked = true; }
    form.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    setTimeout(function () { $('[name=telefono]', form).focus({ preventScroll: true }); }, 500);
  }
  window.RBV = { prefill: prefill, zona: Z };
  function abreWA(t) { var w = window.open(wa(t), '_blank'); if (w) w.opener = null; else location.href = wa(t); }
  if (form) {
    var zsel = $('[name=zona]', form);
    if (zsel) { if (Z.get()) zsel.value = Z.get(); zsel.addEventListener('change', function () { Z.set(zsel.value); $$('a[data-wa]').forEach(function (a) { a.href = wa(a.getAttribute('data-wa').replace('[zona]', zonaTxt())); }); }); }
    var dl = $('#lista-codigos'); if (dl) { var ks = {}; CODIGOS.forEach(function (c) { c.keys.forEach(function (k) { if (k.length > 2) ks[k] = APARATOS[c.ap].nombre; }); }); dl.innerHTML = Object.keys(ks).sort().map(function (k) { return '<option value="' + k + '">' + ks[k] + '</option>'; }).join(''); }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if ($('[name=web]', form).value) return; /* honeypot */
      var tel = $('[name=telefono]', form), g = tel.closest('.f-g'), num = tel.value.replace(/[\s\-\.]/g, '');
      var okTel = /^(\+34|0034)?[6789]\d{8}$/.test(num); g.classList.toggle('bad', !okTel);
      var rg = $('[name=rgpd]', form), gr = rg.closest('.f-g'); gr.classList.toggle('bad', !rg.checked);
      if (!okTel) { tel.focus(); return; } if (!rg.checked) { rg.focus(); return; }
      var ap = ($$('[name=aparato]:checked', form)[0] || {}).value || '', si = ($$('[name=sintoma]:checked', form)[0] || {}).value || '';
      var cod = $('[name=codigo]', form).value.trim().toUpperCase(), zona = zsel ? zsel.value : '';
      var t = 'Hola, quiero que me llaméis.';
      if (ap) t += ' Aparato: ' + ap + ' ' + CONFIG.MARCA + '.'; if (si) t += ' Le pasa: ' + si.toLowerCase() + '.'; if (cod) t += ' Código: ' + cod + '.';
      if (zona) t += ' Zona: ' + zona + '.'; t += ' Teléfono: ' + tel.value.trim() + '.';
      var fin = function () { form.hidden = true; var ok = $('.f-ok', form.parentNode); ok.classList.add('on'); ok.setAttribute('tabindex', '-1'); ok.focus(); };
      if (CONFIG.FORM_ENDPOINT) {
        fetch(CONFIG.FORM_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify({ aparato: ap, sintoma: si, codigo: cod, telefono: tel.value, zona: zona, mensaje: t }) })
          .then(function (r) { if (!r.ok) throw 0; fin(); }).catch(function () { abreWA(t); fin(); });
      } else { abreWA(t); fin(); }
    });
  }

  /* ---------- mini formulario del hero (landings de aparato) */
  function validaTel(tel) { var g = tel.closest('.f-g'), num = tel.value.replace(/[\s\-\.]/g, ''); var ok = /^(\+34|0034)?[6789]\d{8}$/.test(num); g.classList.toggle('bad', !ok); return ok; }
  $$('.form-mini').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      if ($('[name=web]', f).value) return;
      var tel = $('[name=telefono]', f), rg = $('[name=rgpd]', f), gr = rg.closest('.f-g');
      var okTel = validaTel(tel); gr.classList.toggle('bad', !rg.checked);
      if (!okTel) { tel.focus(); return; } if (!rg.checked) { rg.focus(); return; }
      var ap = $('[name=aparato]', f).value, si = $('[name=sintoma]', f).value;
      var t = 'Hola, quiero que me llaméis. Aparato: ' + ap + ' ' + CONFIG.MARCA + '.' + (si ? ' Le pasa: ' + si.toLowerCase() + '.' : '') + (Z.get() ? ' Zona: ' + Z.get() + '.' : '') + ' Teléfono: ' + tel.value.trim() + '.';
      abreWA(t); f.hidden = true; var ok = $('.f-ok', f.parentNode); ok.classList.add('on'); ok.setAttribute('tabindex', '-1'); ok.focus();
    });
  });
  var hfb = $('.hero-form-b');
  if (hfb) hfb.addEventListener('click', function () { var on = hfb.getAttribute('aria-expanded') === 'true'; hfb.setAttribute('aria-expanded', on ? 'false' : 'true'); hfb.parentNode.classList.toggle('on', !on); if (!on) setTimeout(function () { $('.form-mini [name=telefono]').focus({ preventScroll: false }); }, 50); });
  /* ---------- desplegable de aparatos (cabecera) */
  var dd = $('.dd');
  if (dd) {
    var ddb = $('.dd-b', dd);
    ddb.addEventListener('click', function () { var on = dd.classList.toggle('on'); ddb.setAttribute('aria-expanded', on ? 'true' : 'false'); });
    document.addEventListener('click', function (e) { if (!dd.contains(e.target)) { dd.classList.remove('on'); ddb.setAttribute('aria-expanded', 'false'); } });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { dd.classList.remove('on'); ddb.setAttribute('aria-expanded', 'false'); } });
  }

  /* ================================================================ MAPA de zonas */
  var mapa = $('.mapa');
  if (mapa) {
    var info = $('.mapa-info', mapa), zs = $$('.z', mapa);
    var pinta = function (z) {
      zs.forEach(function (o) { o.classList.toggle('on', o === z); });
      var n = z.getAttribute('data-nombre'), href = z.getAttribute('data-href'); Z.set(n);
      info.innerHTML = '<p class="kicker">Cubrimos ' + esc(n) + '</p><h3>Llama al <a class="link" href="' + CONFIG.TEL_HREF + '">' + CONFIG.TEL + '</a></h3><p>' + esc(z.getAttribute('data-txt') || '') + '</p>' +
        '<div class="grid grid-2"><a class="btn btn-wa btn-sm" target="_blank" rel="noopener" href="' + wa('Hola, tengo un ' + CONFIG.MARCA + ' que… Estoy en ' + n) + '">' + ico('wa') + 'WhatsApp desde ' + esc(n) + '</a>' +
        (href ? '<a class="btn btn-ghost btn-sm" href="' + href + '">Ver ' + esc(n) + ' →</a>' : '<a class="btn btn-ghost btn-sm" href="#contacto">Te llamamos en &lt; 1 h</a>') + '</div>';
      if (zsel) zsel.value = n;
    };
    zs.forEach(function (z) { z.addEventListener('click', function () { pinta(z); }); z.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pinta(z); } }); });
  }
})();
