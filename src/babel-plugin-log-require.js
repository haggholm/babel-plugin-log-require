import { declare } from '@babel/helper-plugin-utils';
import { types as t } from '@babel/core';

export default declare((api) => {
	api.assertVersion(7);

	return {
		visitor: {
			Program(path, state) {
				let filename = state.filename || state.opts.filename;
				if (!filename) {
					return;
				}

				const varName = path.scope.generateUidIdentifier('logRequireTimestamp');

				filename = filename.replace(/(?:.*node_modules\/)(.+)$/, '$1');

				path.unshiftContainer(
					'body',
					t.expressionStatement(
						t.callExpression(
							t.memberExpression(t.identifier('console'), t.identifier('info')),
							[t.stringLiteral(`Begin loading module: ${filename}`)]
						)
					)
				);

				path.unshiftContainer(
					'body',
					t.variableDeclaration(
						'const',
						[t.variableDeclarator(
							varName,
							t.callExpression(t.memberExpression(t.identifier('Date'), t.identifier('now')), [])
						)]
					)
				);

				path.pushContainer(
					'body',
					t.expressionStatement(
						t.callExpression(
							t.memberExpression(
								t.identifier('console'),
								t.identifier('info')
							),
							[
								t.stringLiteral(`Finished loading module: ${filename}:`),
								// t1 - t0
								t.binaryExpression('-',
									t.callExpression(t.memberExpression(t.identifier('Date'), t.identifier('now')), []),
									varName
								),
								t.stringLiteral('ms')
							]
						)
					)
				);
			},
		},
	};
});
