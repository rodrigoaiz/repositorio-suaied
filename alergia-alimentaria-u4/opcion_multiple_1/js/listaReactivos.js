var reactivos = [
	{
		Q: "¿Qué efecto tienen los prebióticos sobre las bacterias intestinales beneficiosas?"
		, A: [
			{ opcion: "Reducen su actividad.", correcta: false },
			{ opcion: "Aumentan su proliferación.", correcta: true},
      { opcion: "Inhiben su capacidad de colonización.", correcta: false },
      { opcion: "Disminuyen la producción de IgA.", correcta: false }
		]
		,
		F: [
			"¡Correcto!",
			"Recuerda que los prebióticos tienen efectos muy favorables sobre las bacterias intestinales beneficiosas porque estimulan su crecimiento y actividad, propiciando un equilibrio saludable en la microbiota intestinal. Además, promueven la producción de ácidos grasos de cadena corta, los cuales son benéficos para la salud intestinal y el metabolismo, así como la modulación del sistema inmunológico, favoreciendo la tolerancia inmunológica y reduciendo la inflamación."
		]
	},
  {
    Q: "Ingrediente que debe evitarse en la dieta de eliminación de la leche:"
    , A: [
      { opcion: "Suero desmineralizado", correcta: true },
      { opcion: "Merengue en polvo", correcta: false },
      { opcion: "Globulina", correcta: false },
      { opcion: "Livetina", correcta: false }
    ]
    ,
    F: [
      "¡Correcto!",
      "Se recomienda revisar la tabla correspondiente, en la que se incluyen suero de leche, suero curado, suero sin lactosa, suero desmineralizado, suero lácteo dulce, concentrado de proteína de suero, sólidos de suero, suero y proteína de suero."
    ]
  },
  {
    Q: "¿Cuál de los siguientes factores puede aumentar el riesgo de reacciones alérgicas durante la OIT?"
    , A: [
      { opcion: "Realizar ejercicio después de una dosis.", correcta: true },
      { opcion: "Consumir alimentos ricos en vitamina C.", correcta: false },
      { opcion: "Dormir adecuadamente.", correcta: false },
      { opcion: "Evitar los alérgenos de manera estricta.", correcta: false }
    ]
    ,
    F: [
      "¡Correcto!",
      "En general, se sabe que el ejercicio puede influir en la respuesta inmunitaria y alterar potencialmente la forma en que el cuerpo reacciona a los alérgenos, aunque esto depende de varios factores, como la intensidad del ejercicio, el momento de la actividad y el tipo de alergia."
    ]
  },
  {
    Q: "Forma parte del manejo de la alergia alimentaria en la casa:"
    , A: [
      { opcion: "Comprar alimentos preparados.", correcta: false },
      { opcion: "Buscar sustitutos adecuados de forma nutricional.", correcta: true },
      { opcion: "Aceptar las aversiones a alimentos en adolescentes.", correcta: false },
      { opcion: "Comer libremente lo que ofrezcan en fiestas o reuniones.", correcta: false }
    ]
    ,
    F: [
      "¡Correcto!",
      "Se recomienda que los alimentos se preparen en casa para garantizar que el proceso sea seguro para el paciente, ya que, al eliminar un alimento de la dieta, se debe cubrir el aporte calórico y nutrimental que brindaba ese alimento."
    ]
  },
  {
    Q: "Componentes de la dieta empírica de cuatro elementos:"
    , A: [
      { opcion: "Leche, huevo, trigo y soya", correcta: true },
      { opcion: "Huevo, trigo, frutos secos y mariscos", correcta: false },
      { opcion: "Huevo, soya, frutos secos y mariscos", correcta: false },
      { opcion: "Sésamo, frutos secos, soya y alimentos del mar", correcta: false }
    ]
    ,
    F: [
      "¡Correcto!",
      "Además de esta dieta, se identifica la dieta empírica de seis alimentos —leche, huevo, trigo, soya, frutos secos y pescados y mariscos—, así como la dieta empírica de un alimento —leche—; sin embargo, la decisión de cuál dieta utilizar siempre debe ser tomada por la médica o el médico y el equipo multidisciplinario."
    ]
  },
  {
    Q: "Alimentos que se deben evitar en el síndrome de alfa-gal:"
    , A: [
      { opcion: "Todos los productos de origen animal", correcta: false },
      { opcion: "Carnes rojas de mamíferos", correcta: true },
      { opcion: "Carne de mono", correcta: false },
      { opcion: "Leche y huevo", correcta: false }
    ]
    ,
    F: [
      "¡Correcto!",
      "Cuando existe IgE específica a alfa-gal, se debe evitar el consumo de productos procedentes de mamíferos diferentes a los simios, así como aquellos que empleen gelatina en su producción, ya que ésta contiene colágeno de origen animal."
    ]
  },
  {
    Q: "Dosis de omeprazol indicada para la remisión clínica de la esofagitis eosinofílica en adultos:"
    , A: [
      { opcion: "5 mg/kg", correcta: false },
      { opcion: "10 mg cada 12 horas", correcta: false },
      { opcion: "20-40 mg cada 12 horas", correcta: true },
      { opcion: "40 mg cada 24 horas", correcta: false }
    ]
    ,
    F: [
      "¡Correcto!",
      "Recuerda que, en niñas o niños, la dosis recomendada es de 1-2 mg/kg de omeprazol al día o equivalente."
    ]
  },
  {
    Q: "¿Qué aspecto es fundamental en el manejo nutricional de la alergia alimentaria?"
    , A: [
      { opcion: "Eliminar todos los alérgenos sin excepción.", correcta: false },
      { opcion: "Mantener una dieta variada y equilibrada.", correcta: true },
      { opcion: "Suplementación obligatoria de vitamina B12.", correcta: false },
      { opcion: "Evitar cualquier tipo de proteína animal.", correcta: false }
    ]
    ,
    F: [
      "¡Correcto!",
      "El aspecto fundamental en el manejo nutricional de la alergia alimentaria es garantizar la evitación estricta del alérgeno mientras se mantiene una dieta equilibrada y se previenen deficiencias nutricionales."
    ]
  },
  {
    Q: "¿Cuál es el principal objetivo terapéutico en la alergia alimentaria?"
    , A: [
      { opcion: "Eliminar todos los alérgenos de la dieta.", correcta: false },
      { opcion: "Incrementar la producción de IgE.", correcta: false },
      { opcion: "Promover la tolerancia inmunológica.", correcta: true },
      { opcion: "Reducir la cantidad de linfocitos T.", correcta: false }
    ]
    ,
    F: [
      "¡Correcto!",
      "Recuerda que, con esto, se busca reducir la sensibilidad del sistema inmunológico y disminuir la severidad de las reacciones alérgicas, en última instancia, proporcionando una mayor protección frente a la exposición accidental al alérgeno."
    ]
  },
  {
    Q: "¿Cuál es el objetivo principal de la intervención nutricional en los tres primeros años de vida?"
    , A: [
      { opcion: "Prevenir el sobrepeso.", correcta: false },
      { opcion: "Reducir el consumo de alimentos alergénicos.", correcta: false },
      { opcion: "Influir en el riesgo de desarrollar alergias mediante mecanismos epigenéticos.", correcta: true },
      { opcion: "Garantizar el consumo de proteínas.", correcta: false }
    ]
    ,
    F: [
      "¡Correcto!",
      "Recuerda que la epigenética puede influir en la aparición y el desarrollo de enfermedades alérgicas, incluidas las alergias alimentarias. La epigenética se refiere a los cambios en la expresión génica que no implican alteraciones en la secuencia del ADN, sino que están regulados por mecanismos como la metilación del ADN, las modificaciones de las histonas y la regulación del ARN no codificante. Estos cambios pueden ser influenciados por factores ambientales, como la dieta, la exposición a contaminantes, el estrés, entre otros."
    ]
  }
]