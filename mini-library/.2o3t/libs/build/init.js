import config from './config';

import rollupConfig from './rollupConfig';

export default function(options) {

    Object.assign(config, options);

    return rollupConfig;
}
