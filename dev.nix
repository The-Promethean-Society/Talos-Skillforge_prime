{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  # Add the Docker package to the environment
  packages = [
    pkgs.docker,
    pkgs.docker-compose,
    # Include other necessary development tools here
    pkgs.nodejs-18_x,
    pkgs.protobuf,
    pkgs.go,
    pkgs.python3,
    pkgs.python3Packages.grpcio-tools,
    pkgs.protoc-gen-go,
    pkgs.protoc-gen-go-grpc
  ];

  # Setup necessary environment variables or initialization commands
  shellHook = ''
    # Manually start the Docker daemon in the background.
    # The '&' runs it as a background job.
    dockerd-rootless & 
    # Allow some time for the daemon to initialize.
    sleep 5 
    echo "Nix environment ready. Docker daemon has been started in the background."
  '';
}
