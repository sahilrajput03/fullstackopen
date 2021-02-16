:: YOu can use below command to link the complete to complete global node_modules fodler. Its amazing though.
:: npm link
:: Avoid using npm install, its the source of timewaste and unplanned installations of repositories.
:: You don't need to install any repository to use it, you can just do => npm link <pkg-name> and later on, when everthying seems fine, put the packages from global packages list to the local package.
:: UPDATE- Executing this file won't be much helpful, coz its designed for manual usage now. :: executing this file two times might give you the desired result.
npm link express
npm link cors

npm link @types/node
npm link @types/express
npm link @types/cors

npm link @typescript-eslint/eslint-plugin
npm link @typescript-eslint/parser
::Below are helpful with nls-
nls express

nls -D @types/node
nls -D @types/express

nls -D @typescript-eslint/eslint-plugin
nls -D @typescript-eslint/parser

:: eslint 
$ eslint --init