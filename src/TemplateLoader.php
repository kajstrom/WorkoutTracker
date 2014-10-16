<?php

namespace WorkoutTracker;

/**
 * Class TemplateLoader
 *
 * Responsible for including templates into the HTML.
 *
 * In future this will be replaced entirely with an alternative method for loading templates for
 * the Marionette Application.
 *
 * @package WorkoutTracker
 * @author Kaj Ström
 */
class TemplateLoader {
    /**
     * Outputs templates as script tags.
     */
    public function outputTemplates() {
        $templates = $this->loadTemplates();
        echo "<!-- Begin TemplateLoader output -->" . PHP_EOL;

        foreach ($templates as $id => $templateHtml) {
            printf('<script id="%s" type="text/tpl">%s</script>' . PHP_EOL, $id, $templateHtml);
        }

        echo "<!-- End TemplateLoader output -->" . PHP_EOL;
    }

    /**
     * Loads template files from the template directory.
     *
     * @return array
     */
    protected function loadTemplates() {
        $templates = [];

        foreach (new \DirectoryIterator("./assets/templates") as $fileInfo) {
            if ($fileInfo->getExtension() === "html") {
                $templates[$fileInfo->getBasename(".html")] = file_get_contents($fileInfo->getRealPath());
            }
        }

        return $templates;
    }
} 