# To learn more about how to use Nix to configure your environment,
# see: https://developers.google.com/ide/docs/dev-environments/customize
{
  # Which nixpkgs channel to use.
  pkgs = import (fetchTarball "https://github.com/NixOS/nixpkgs/archive/e54f343362081f96b279a6a575791d61c6c59b77.tar.gz") {};
  # The packages to install.
  packages = [
    pkgs.nodejs_20
    pkgs.patch-package
    pkgs.docker
  ];
  # Sets environment variables in the container.
  env = {};
  # Defines the services that should be started in the background.
  services = {
    # Enables the Docker daemon service.
    docker = {
      enable = true;
    };
  };
  # Docker settings
  docker.package = pkgs.docker_26;
}
