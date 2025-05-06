
export const UtilUrl = () => {

  const urlEntornoLocal = 'http://localhost:8082';
  const urlEntornoLambda = 'https://cgmoazbtxd.execute-api.us-east-1.amazonaws.com/Stage/unadmin';
  const urlDominioServidor = 'http://44.200.252.58:8082';

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
    4: {
      urlEntornoLocal,
      urlEntornoLambda,
      pathLambda: '/service/caradmin/getUsuariosApp',
      urlDominioServidor
    },
    5: {
      urlEntornoLocal,
      urlEntornoLambda,
      pathLambda: '/service/caradmin/registroUsuarioApp',
      urlDominioServidor
    },
    6: {
      urlEntornoLocal,
      urlEntornoLambda,
      pathLambda: '/service/caradmin/actualizaUsuarioApp',
      urlDominioServidor
    },
    7: {
      urlEntornoLocal,
      urlEntornoLambda,
      pathLambda: '/service/caradmin/actualizaContraseniaApp',
      urlDominioServidor
    },
    8: {
      urlEntornoLocal,
      urlEntornoLambda,
      pathLambda: '/service/caradmin/eliminaUsuarioApp',
      urlDominioServidor
    },
    9: {
      urlEntornoLocal,
      urlEntornoLambda,
      pathLambda: '/service/caradmin/getDashboardInfo',
      urlDominioServidor
    },
    10: {
      urlEntornoLocal,
      urlEntornoLambda,
      pathLambda: '/service/caradmin/registroContratoRh',
      urlDominioServidor
    },
    11: {
      urlEntornoLocal,
      urlEntornoLambda,
      pathLambda: '/service/caradmin/getRHsInfo',
      urlDominioServidor
    },
    12: {
      urlEntornoLocal,
      urlEntornoLambda,
      pathLambda: '/service/caradmin/getContratosRHsInfo',
      urlDominioServidor
    },
    13: {
      urlEntornoLocal,
      urlEntornoLambda,
      pathLambda: '/service/caradmin/eliminarContratoRh',
      urlDominioServidor
    },
    14: {
      urlEntornoLocal,
      urlEntornoLambda,
      pathLambda: '/service/caradmin/terminarContratoRh',
      urlDominioServidor
    }

  }

  return {
    apiLambda: true,
    url
  }

}

