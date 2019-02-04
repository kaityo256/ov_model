# GitHub方言のMarkdownをQiita方言に直す手抜きスクリプト

def in_math
  puts "```math"
  while line = gets
    if line =~ /^\$\$/
      return
    elsif line =~ /\\begin{aligned}/
      puts "\\begin{align}"
    elsif line =~ /\\end{aligned}/
      puts "\\end{align}"
    else
      print line
    end
  end
end

while line = gets
  in_math if line =~ /^\$\$/
  if line =~ /^\$\$/
    puts "```"
  elsif line =~ /\#\# (.*)/
    puts "# #{$1}"
  else
    print line
  end
end
