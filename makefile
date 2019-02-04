all: index.html
PANDOC=pandoc -s --mathjax -t html --template=template

index.html: index.md
	$(PANDOC) index.md -o index.tmp
	sed '/simulator/r ./simulator.html' index.tmp > index.html
	rm -f index.tmp

.PHONY: clean

clean:
	rm -f index.html
