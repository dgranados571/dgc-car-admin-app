
export const UtilUrl = () => {

  const urlEntornoLocal = 'http://localhost:8082';
  const urlEntornoLambda = 'https://cgmoazbtxd.execute-api.us-east-1.amazonaws.com/Stage/unadmin';
  const urlDominioServidor = 'http://34.207.82.37:8082';

  const url: { [key: number]: { urlEntornoLambda: string; urlEntornoLocal: string; urlDominioServidor: string; pathLambda: string; } } = {
    1: {
      urlEntornoLocal,
      urlEntornoLambda,
      pathLambda: '/service/caradmin/registroRecursoHumano',
      urlDominioServidor
    },
    2: {
      urlEntornoLocal,
      urlEntornoLambda,
      pathLambda: '/service/caradmin/loginApp',
      urlDominioServidor
    },
    3: {
      urlEntornoLocal,
      urlEntornoLambda,
      pathLambda: '/service/caradmin/activacionUsuarioApp',
      urlDominioServidor
    },
  }

  return {
    apiLambda: false,
    url
  }

}

