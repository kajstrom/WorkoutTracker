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
    public function outputTemplates() {
        echo "<!-- Templates will be loaded here -->";
    }

    protected function loadTemplates() {

    }
} 