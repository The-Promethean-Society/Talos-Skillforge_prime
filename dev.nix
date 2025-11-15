{ pkgs, ... }: {
  # https://devenv.sh/basics/
  # https://devenv.sh/packages/
  # https://devenv.sh/scripts/
  packages = [
    pkgs.nodejs_20,
    pkgs.patch-package,
    pkgs.docker
  ];

  # https://devenv.sh/languages/
  languages.javascript.enable = true;

  enterShell = ''
    # Is the first time we enter the shell?
    if [ ! -d "node_modules" ]; then
      npm install
    fi
  '';
}
