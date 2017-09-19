source 'https://rubygems.org'
gemspec

require 'json'
require 'open-uri'
versions = JSON.parse(open('https://pages.github.com/versions.json').read)

gem 'github-pages', versions['github-pages']
gem 'jekyll'
gem 'jekyll-paginate'
gem 'kramdown'
gem 'pygments.rb'
