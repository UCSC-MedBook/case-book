meteor build ../build.osx --directory --server https://casebookdemo.cancercommons.org --server-only
meteor build ../build --server https://casebookdemo.cancercommons.org --server-only --architecture os.linux.x86_64
scp -pr -i ~/Documents/cancer\ commons/CancerCommonsEngineering.pem ../build/ ubuntu@casebookdemo.cancercommons.org:/app/case-book/
