#!/usr/bin/env python3
"""
Script to inject Vercel Web Analytics into all HTML files.
According to Vercel docs for static sites, we need to add:
1. A script that initializes window.va
2. A deferred script tag to load the analytics
"""

import os
import re
from pathlib import Path

# Vercel Analytics script for static sites
ANALYTICS_SCRIPT = '''<script>
  window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
</script>
<script defer src="/_vercel/insights/script.js"></script>
'''

def inject_analytics(html_content):
    """
    Inject Vercel Analytics script before </head> tag.
    Returns modified HTML content.
    """
    # Check if analytics is already injected
    if '/_vercel/insights/script.js' in html_content:
        return html_content, False
    
    # Find </head> tag and inject before it
    if '</head>' in html_content:
        modified_content = html_content.replace('</head>', f'{ANALYTICS_SCRIPT}</head>', 1)
        return modified_content, True
    
    return html_content, False

def process_html_files(root_dir='.'):
    """
    Process all HTML files in the directory tree.
    """
    modified_count = 0
    skipped_count = 0
    error_count = 0
    
    for html_file in Path(root_dir).rglob('*.html'):
        try:
            # Skip if file is this script or in .git directory
            if '.git' in str(html_file):
                continue
            
            # Read the file
            with open(html_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Inject analytics
            modified_content, was_modified = inject_analytics(content)
            
            if was_modified:
                # Write back the modified content
                with open(html_file, 'w', encoding='utf-8') as f:
                    f.write(modified_content)
                modified_count += 1
                print(f"✓ Modified: {html_file}")
            else:
                skipped_count += 1
                print(f"- Skipped: {html_file}")
                
        except Exception as e:
            error_count += 1
            print(f"✗ Error processing {html_file}: {e}")
    
    print("\n" + "="*60)
    print(f"Summary:")
    print(f"  Modified: {modified_count} files")
    print(f"  Skipped:  {skipped_count} files")
    print(f"  Errors:   {error_count} files")
    print("="*60)

if __name__ == '__main__':
    print("Injecting Vercel Web Analytics into HTML files...")
    print("="*60)
    process_html_files('.')
    print("\nDone!")
