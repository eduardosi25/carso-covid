# frontweb-covid

// 20200612054501
// http://virtserver.swaggerhub.com/abvescamilla/Covid/1/poll/encuesta/question/1

{
  "poll": {
    "title": "Cuestionario de movilidad y trabajo",
    "description": "Tu salud es muy importante para nosotros, como medida de precaución es importante conocer tus hábitos y movimientos cotidianos, ayúdanos llenando el siguiente cuestionario:"
  },
  "sections": [
    {
      "title": "Vivienda",
      "questions": [
        {
          "id": 1,
          "question": "Selecciona una opción que describa el tipo de vivienda que habitas",
          "type": "SELECT",
          "choices": [
            {
              "id": 1,
              "choice": "Casa",
              "nested": "null"
            },
            {
              "id": 2,
              "choice": "Departamento",
              "nested": "null"
            }
          ]
        },
        {
          "id": 2,
          "question": "¿Alguna de las personas con las que vives está en contacto directo con personas contagiadas o con posibles síntomas de COVID19?",
          "type": "SELECT",
          "choices": [
            {
              "id": 3,
              "choice": "Si",
              "nested": [
                {
                  "id": 3,
                  "question": "Especifique la profesión del familiar",
                  "type": "OPEN",
                  "choices": "null"
                }
              ]
            },
            {
              "id": 4,
              "choice": "No",
              "nested": "null"
            }
          ]
        },
        {
          "id": 4,
          "question": "¿Alguna de las personas con las que vives ha sido caso sospechoso o confirmado de COVID-19?",
          "type": "SELECT",
          "choices": [
            {
              "id": 5,
              "choice": "Si",
              "nested": "null"
            },
            {
              "id": 6,
              "choice": "No",
              "nested": "null"
            }
          ]
        },
        {
          "id": 5,
          "question": "En casa, ¿practican lavado de manos y/o uso de alcohol gel continuamente?",
          "type": "SELECT",
          "choices": [
            {
              "id": 7,
              "choice": "Si",
              "nested": "null"
            },
            {
              "id": 8,
              "choice": "No",
              "nested": "null"
            }
          ]
        },
        {
          "id": 6,
          "question": "¿Con qué frecuencia se hace limpieza o desinfección de la casa?",
          "type": "SELECT",
          "choices": [
            {
              "id": 9,
              "choice": "Menos de una vez a la semana",
              "nested": "null"
            },
            {
              "id": 10,
              "choice": "1 a 2 veces a la semana",
              "nested": "null"
            },
            {
              "id": 11,
              "choice": "3 veces o más a la semana",
              "nested": "null"
            }
          ]
        }
      ]
    },
    {
      "title": "Condiciones laborales",
      "questions": [
        {
          "id": 7,
          "question": "¿En dónde desarrollas normalmente tu actividad laboral?",
          "type": "SELECT",
          "choices": [
            {
              "id": 12,
              "choice": "Instalaciones propias de la empresa",
              "nested": [
                {
                  "id": 8,
                  "question": "Seleccione el tipo de instalación",
                  "type": "SELECT",
                  "choices": [
                    {
                      "id": 13,
                      "choice": "Centro de atención a cliente",
                      "nested": "null"
                    },
                    {
                      "id": 14,
                      "choice": "Mostrador",
                      "nested": "null"
                    },
                    {
                      "id": 15,
                      "choice": "Restaurante",
                      "nested": "null"
                    },
                    {
                      "id": 16,
                      "choice": "Mina",
                      "nested": "null"
                    },
                    {
                      "id": 17,
                      "choice": "Construcción",
                      "nested": "null"
                    },
                    {
                      "id": 18,
                      "choice": "Oficina",
                      "nested": "null"
                    },
                    {
                      "id": 19,
                      "choice": "Fábrica",
                      "nested": "null"
                    },
                    {
                      "id": 20,
                      "choice": "Otros",
                      "nested": [
                        {
                          "id": 8,
                          "question": "Especifique",
                          "type": "OPEN",
                          "choices": "null"
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "id": 21,
              "choice": "Instalaciones del cliente",
              "nested": [
                {
                  "id": 10,
                  "question": "Colocar el nombre de la empresa (cliente)",
                  "type": "OPEN",
                  "choices": "null"
                }
              ]
            }
          ]
        },
        {
          "id": 11,
          "question": "¿Trabaja de manera temporal o permanente en el sitio en el que actualmente se desempeña?",
          "type": "SELECT",
          "choices": [
            {
              "id": 22,
              "choice": "Temporal",
              "nested": "null"
            },
            {
              "id": 23,
              "choice": "Permanente",
              "nested": "null"
            }
          ]
        },
        {
          "id": 12,
          "question": "¿Cuál es el código postal del lugar donde desarrolla normalmente su actividad laboral?",
          "type": "OPEN",
          "choices": "null"
        },
        {
          "id": 13,
          "question": "¿Cuál de las siguientes opciones describe mejor tu actividad laboral?",
          "type": "SELECT",
          "choices": [
            {
              "id": 24,
              "choice": "Trabajo de oficina",
              "nested": "null"
            },
            {
              "id": 25,
              "choice": "Trabajo en calle",
              "nested": "null"
            },
            {
              "id": 26,
              "choice": "Trabajo en fábrica o similar",
              "nested": "null"
            },
            {
              "id": 27,
              "choice": "Atención directa a clientes en tienda o centro de atención",
              "nested": "null"
            },
            {
              "id": 28,
              "choice": "Servicios en domicilio de clientes",
              "nested": "null"
            },
            {
              "id": 29,
              "choice": "Atención telefónica a clientes ",
              "nested": "null"
            },
            {
              "id": 30,
              "choice": "Atención directa a clientes en restaurante",
              "nested": "null"
            }
          ]
        },
        {
          "id": 14,
          "question": "¿Conoces quién es tu supervisor de RH (es la persona que en la empresa monitorea tu salud)?",
          "type": "SELECT",
          "choices": [
            {
              "id": 31,
              "choice": "No (Es importante que te reportes con la persona responsable de tu seguimiento en la empresa para asegurar tu permanencia laboral)",
              "nested": "null"
            },
            {
              "id": 32,
              "choice": "Sí",
              "nested": [
                {
                  "id": 15,
                  "question": "¿Quién es? (nombre completo)",
                  "type": "OPEN",
                  "choices": "null"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "title": "Movilidad",
      "questions": [
        {
          "id": 16,
          "question": "¿Cuál es tu principal medio de transporte?",
          "type": "SELECT",
          "choices": [
            {
              "id": 33,
              "choice": "Auto particular",
              "nested": [
                {
                  "id": 17,
                  "question": "¿Compartes tu vehículo?",
                  "type": "SELECT",
                  "choices": [
                    {
                      "id": 34,
                      "choice": "Sí"
                    },
                    {
                      "id": 35,
                      "choice": "No"
                    }
                  ]
                }
              ]
            },
            {
              "id": 36,
              "choice": "Auto particular de amigo/compañero",
              "nested": "null"
            },
            {
              "id": 37,
              "choice": "Motocicleta",
              "nested": "null"
            },
            {
              "id": 38,
              "choice": "Camino",
              "nested": "null"
            },
            {
              "id": 39,
              "choice": "Bicicleta",
              "nested": "null"
            },
            {
              "id": 40,
              "choice": "Transporte público",
              "nested": [
                {
                  "id": 18,
                  "question": "Seleccione los medios de transporte que utiliza (Regla: El empleado puede seleccionar más de una opción)",
                  "type": "MULTISELECT",
                  "choices": [
                    {
                      "id": 41,
                      "choice": "Metro",
                      "nested": "null"
                    },
                    {
                      "id": 42,
                      "choice": "Metrobús",
                      "nested": "null"
                    },
                    {
                      "id": 43,
                      "choice": "Camión, microbús, camioneta",
                      "nested": "null"
                    },
                    {
                      "id": 44,
                      "choice": "Taxi",
                      "nested": "null"
                    },
                    {
                      "id": 45,
                      "choice": "Uber, Didi, entre otros",
                      "nested": "null"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "id": 19,
          "question": "¿En promedio, cuánto tiempo utilizas en trasladarte de tu casa a tu centro de trabajo?",
          "type": "SELECT",
          "choices": [
            {
              "id": 46,
              "choice": "0 – 15 min",
              "nested": "null"
            },
            {
              "id": 47,
              "choice": "16 – 30 min",
              "nested": "null"
            },
            {
              "id": 48,
              "choice": "31 – 60 min",
              "nested": "null"
            },
            {
              "id": 49,
              "choice": "61 – 90 min",
              "nested": "null"
            },
            {
              "id": 50,
              "choice": "91 – 120 min",
              "nested": "null"
            },
            {
              "id": 51,
              "choice": "121 - 150 min",
              "nested": "null"
            },
            {
              "id": 52,
              "choice": "151 – 180 min",
              "nested": "null"
            }
          ]
        }
      ]
    }
  ]
}