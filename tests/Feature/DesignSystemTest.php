<?php

namespace Tests\Feature;

use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class DesignSystemTest extends TestCase
{
    public function test_l_accueil_mene_au_design_system(): void
    {
        $this->get('/')->assertRedirect('/design-system');
    }

    public function test_la_page_design_system_s_affiche(): void
    {
        $this->get('/design-system')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page->component('DesignSystem'));
    }
}
