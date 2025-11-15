{ pkgs, ... }: {
  # https://devenv.sh/basics/
  name = "skillforge-prime";

  # https://devenv.sh/packages/
  packages = [
    pkgs.nodejs_20
    pkgs.patch-package
    pkgs.docker
  ];

  # https://devenv.sh/languages/
  languages.javascript.enable = true;

  # https://devenv.sh/scripts/
  scripts.npm-install.exec = "npm install";

  enterShell = ''
    npm install
  '';

  # https://devenv.sh/services/
  # services.postgres.enable = true;
}
