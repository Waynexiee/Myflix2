module UrlHelper
  def redefine_url(url)
    ret = url.split("/")
    ret[2] += ".herokuapp.com"
    ret.join("/")
  end
end