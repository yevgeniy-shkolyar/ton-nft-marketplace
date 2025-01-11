### Variables

variable "VERSION" {
  default = "latest"
}

variable "CHART_VERSION" {
  default = "latest"
}

variable "DOCKER_REGISTRY" {
  default = "tgmbot.com"
}

variable "CLIENT_BASEPATH" {
  default = ""
}

# Builds image tags for publication
function "image_tags" {
    params = [NAME]
    result = [
      "${DOCKER_REGISTRY}/${NAME}:${VERSION}",
      "${DOCKER_REGISTRY}/${NAME}:${CHART_VERSION}",
    ]
}

function "cache_tags" {
    params = [NAME, MODE]
    result = [
      equal(MODE, "") ?
        "type=registry,ref=${DOCKER_REGISTRY}/cache:${NAME}" :
        "type=registry,ref=${DOCKER_REGISTRY}/cache:${NAME},mode=${MODE}"
    ]
}

### Groups

group "default" {
  targets = [
    "api",
    "client",
    "dev",
  ]
}

### Targets

target "api" {
  tags = image_tags("api")
  dockerfile = "./Dockerfile"
  context = "."
  target = "api"
  platforms = ["linux/amd64"]
  cache-from = cache_tags("api", "")
  cache-to = cache_tags("api", "max")
}

target "client" {
  tags = image_tags("client")
  dockerfile = "./Dockerfile"
  context = "."
  target = "client"
  args = {
    BASEPATH = "${CLIENT_BASEPATH}"
  }
  platforms = ["linux/amd64"]
  cache-from = cache_tags("client", "")
  cache-to = cache_tags("client", "max")
}

target "dev" {
  tags = image_tags("dev")
  dockerfile = "./Dockerfile"
  context = "."
  target = "dev"
  platforms = ["linux/amd64"]
  cache-from = cache_tags("dev", "")
  cache-to = cache_tags("dev", "max")
}
