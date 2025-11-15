{ pkgs, ... }: {
  packages = [
    pkgs.nodejs_20,
    pkgs.patch-package,
    pkgs.docker,
  ];

  devcontainer.features.docker-in-docker.enable = true;

  enterShell = ''
    # Ensure Docker daemon is running
    if ! pgrep -x "dockerd" > /dev/null; then
      sudo dockerd > /dev/null 2>&1 &
      # Wait for the docker socket to be available
      while [ ! -S /var/run/docker.sock ]; do
        sleep 1
      done
      # Set correct permissions for the docker socket
      sudo chmod 666 /var/run/docker.sock
    fi
  '';
}
