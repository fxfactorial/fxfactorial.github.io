webpackJsonp([0xeb57f4c93de3],{478:function(n,s){n.exports={data:{site:{siteMetadata:{title:"Edgar Aroutiounian's website",author:"Edgar Aroutiounian"}},markdownRemark:{id:"/Users/Edgar/Repos/fxfactorial.github.io/src/pages/2016-03-07-dga-padcrypt-reason/index.md absPath of file >>> MarkdownRemark",html:'<p><em>This post was orginally written on <code>2016-03-07</code> and was in OCaml</em></p>\n<p>Scrolling through twitter I saw someone mention something about the\npadcrypt\n<a href="https://en.wikipedia.org/wiki/Domain_generation_algorithm">dga</a>. Basically\nit generates random ish domain names. </p>\n<p>Here’s a <code>ReasonML</code> reimplementation of the Python code written\n<a href="http://johannesbader.ch/2016/03/the-dga-of-padcrypt/">here</a>.</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token comment">/*  assume this is example_core.re */</span>\n\nmodule D <span class="token operator">=</span> CalendarLib<span class="token punctuation">.</span>Date<span class="token punctuation">;</span>\n\n<span class="token keyword">let</span> tlds <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token operator">|</span><span class="token string">"com"</span><span class="token punctuation">,</span> <span class="token string">"co.uk"</span><span class="token punctuation">,</span> <span class="token string">"de"</span><span class="token punctuation">,</span> <span class="token string">"org"</span><span class="token punctuation">,</span> <span class="token string">"net"</span><span class="token punctuation">,</span> <span class="token string">"eu"</span><span class="token punctuation">,</span> <span class="token string">"info"</span><span class="token punctuation">,</span> <span class="token string">"online"</span><span class="token punctuation">,</span> <span class="token string">"co"</span><span class="token punctuation">,</span> <span class="token string">"cc"</span><span class="token punctuation">,</span> <span class="token string">"website"</span><span class="token operator">|</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n\n<span class="token keyword">let</span> tlds_count <span class="token operator">=</span> Array<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span>tlds<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">let</span> nr_domains <span class="token operator">=</span> <span class="token number">24</span> <span class="token operator">*</span> <span class="token number">3</span><span class="token punctuation">;</span>\n\n<span class="token keyword">let</span> digit_mapping <span class="token operator">=</span> <span class="token string">"abcdnfolmk"</span><span class="token punctuation">;</span>\n\n<span class="token keyword">let</span> <span class="token function-variable function">seed_string</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token operator">~</span>date<span class="token punctuation">,</span> i<span class="token punctuation">)</span> <span class="token operator">=></span>\n  Printf<span class="token punctuation">.</span><span class="token function">sprintf</span><span class="token punctuation">(</span>\n    <span class="token string">"%d-%d-%d|%d"</span><span class="token punctuation">,</span>\n    D<span class="token punctuation">.</span><span class="token function">day_of_month</span><span class="token punctuation">(</span>date<span class="token punctuation">)</span><span class="token punctuation">,</span>\n    D<span class="token punctuation">.</span><span class="token function">month</span><span class="token punctuation">(</span>date<span class="token punctuation">)</span> <span class="token operator">|</span><span class="token operator">></span> D<span class="token punctuation">.</span>int_of_month<span class="token punctuation">,</span>\n    D<span class="token punctuation">.</span><span class="token function">year</span><span class="token punctuation">(</span>date<span class="token punctuation">)</span><span class="token punctuation">,</span>\n    i\n  <span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">let</span> <span class="token function-variable function">domain_generate</span> <span class="token operator">=</span> <span class="token punctuation">(</span>date<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n  <span class="token keyword">let</span> rec <span class="token function-variable function">helper</span> <span class="token operator">=</span> <span class="token punctuation">(</span>count<span class="token punctuation">,</span> accum<span class="token punctuation">)</span> <span class="token operator">=></span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>count <span class="token operator">==</span> nr_domains<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      accum<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n      <span class="token punctuation">[</span><span class="token function">seed_string</span><span class="token punctuation">(</span><span class="token operator">~</span>date<span class="token punctuation">,</span> count<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token operator">...</span><span class="token function">helper</span><span class="token punctuation">(</span>count <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> accum<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">;</span>\n  <span class="token function">helper</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token keyword">let</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token punctuation">{</span>\n  Nocrypto_entropy_unix<span class="token punctuation">.</span><span class="token function">initialize</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  CalendarLib<span class="token punctuation">.</span>Date<span class="token punctuation">.</span><span class="token function">today</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token operator">|</span><span class="token operator">></span> domain_generate\n  <span class="token operator">|</span><span class="token operator">></span> List<span class="token punctuation">.</span><span class="token function">iter</span><span class="token punctuation">(</span>\n       <span class="token punctuation">(</span>date_stamp<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n         <span class="token keyword">let</span> hashed <span class="token operator">=</span>\n           Cstruct<span class="token punctuation">.</span><span class="token function">of_string</span><span class="token punctuation">(</span>date_stamp<span class="token punctuation">)</span>\n           <span class="token operator">|</span><span class="token operator">></span> Nocrypto<span class="token punctuation">.</span>Hash<span class="token punctuation">.</span><span class="token function">digest</span><span class="token punctuation">(</span><span class="token template-string"><span class="token string">`SHA256)\n           |> Hex.of_cstruct\n           |> (\n             fun\n             | `</span></span><span class="token function">Hex</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span> <span class="token operator">=></span> s\n           <span class="token punctuation">)</span><span class="token punctuation">;</span>\n         <span class="token keyword">let</span> domain <span class="token operator">=</span>\n           String<span class="token punctuation">.</span><span class="token function">sub</span><span class="token punctuation">(</span>hashed<span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">)</span>\n           <span class="token operator">|</span><span class="token operator">></span> Stringext<span class="token punctuation">.</span>to_list\n           <span class="token operator">|</span><span class="token operator">></span> List<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>\n                fun\n                <span class="token operator">|</span> <span class="token string">\'0\'</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token string">\'9\'</span> <span class="token keyword">as</span> hh <span class="token operator">=></span> Char<span class="token punctuation">.</span><span class="token function">code</span><span class="token punctuation">(</span>hh<span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">48</span> <span class="token operator">|</span><span class="token operator">></span> String<span class="token punctuation">.</span><span class="token keyword">get</span><span class="token punctuation">(</span>digit_mapping<span class="token punctuation">)</span>\n                <span class="token operator">|</span> o <span class="token operator">=></span> o\n              <span class="token punctuation">)</span>\n           <span class="token operator">|</span><span class="token operator">></span> Stringext<span class="token punctuation">.</span>of_list<span class="token punctuation">;</span>\n         <span class="token keyword">let</span> tld_index <span class="token operator">=</span>\n           hashed<span class="token punctuation">.</span><span class="token punctuation">[</span>String<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span>hashed<span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span>\n           <span class="token operator">|</span><span class="token operator">></span> Printf<span class="token punctuation">.</span><span class="token function">sprintf</span><span class="token punctuation">(</span><span class="token string">"0x%c"</span><span class="token punctuation">)</span>\n           <span class="token operator">|</span><span class="token operator">></span> int_of_string\n           <span class="token operator">|</span><span class="token operator">></span> <span class="token punctuation">(</span>\n             <span class="token punctuation">(</span>tld<span class="token punctuation">)</span> <span class="token operator">=></span>\n               <span class="token keyword">if</span> <span class="token punctuation">(</span>tld <span class="token operator">>=</span> tlds_count<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n                 <span class="token number">0</span><span class="token punctuation">;</span>\n               <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n                 tld<span class="token punctuation">;</span>\n               <span class="token punctuation">}</span>\n           <span class="token punctuation">)</span><span class="token punctuation">;</span>\n         Printf<span class="token punctuation">.</span><span class="token function">sprintf</span><span class="token punctuation">(</span><span class="token string">"%s.%s"</span><span class="token punctuation">,</span> domain<span class="token punctuation">,</span> tlds<span class="token punctuation">[</span>tld_index<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">|</span><span class="token operator">></span> print_endline<span class="token punctuation">;</span>\n       <span class="token punctuation">}</span>\n     <span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p>To build: </p>\n<div class="gatsby-highlight">\n      <pre class="language-none"><code>$ opam install stringext calendar nocrypto hex jbuilder -y</code></pre>\n      </div>\n<p>And make this simple <code>jbuild</code> file:</p>\n<div class="gatsby-highlight">\n      <pre class="language-lisp"><code>(jbuild_version 1)\n\n(executable\n ((name example_code)\n  (libraries (calendar nocrypto.unix hex stringext))))</code></pre>\n      </div>\n<p>and invoke with:</p>\n<div class="gatsby-highlight">\n      <pre class="language-none"><code>$ jbuilder build example_code.exe</code></pre>\n      </div>\n<p>And a sample run:</p>\n<div class="gatsby-highlight">\n      <pre class="language-none"><code>$ ./_build/default/example_code.exe\nbbkndddlcdbbcbol.info\nooadbecmcfakmdbd.com\nbeafomcedbbdcfad.com\ncdkkddmefboeebed.com\nckdnofmaonfffdkd.com\nblfdkfocbanaafof.com\nmloaaboambcofbdl.eu\nakacnklebmaenkea.website\ncaafakaocnldbbbf.com\nfamcfokdblcbdobd.website\ncbbcdbbocamdmcmd.website\nkaacmbbbldebeefm.org\ndnbbcdfcckedkfdf.online\nlkcclcflfbfaknmc.de\ncmbadacbfokckabn.com\nnaldlmmeedfaabdd.com\nafdcfkdocfckcfda.cc\n...</code></pre>\n      </div>',frontmatter:{title:"A Domain Generating Algorithm in ReasonML",date:"March 07, 2016"}}},pathContext:{slug:"/2016-03-07-dga-padcrypt-reason/"}}}});
//# sourceMappingURL=path---2016-03-07-dga-padcrypt-reason-932bc50acfe3ef0728f0.js.map