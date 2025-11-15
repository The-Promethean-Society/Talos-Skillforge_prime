{ pkgs }: {
  # Installs packages available in the nix channel.
  packages = [
    # Used for running the Next.js application.
    pkgs.nodejs_20

    # Required for the `patch-package` script.
    pkgs.patch

    # Required for building and running Docker containers.
    pkgs.docker
  ];
}
